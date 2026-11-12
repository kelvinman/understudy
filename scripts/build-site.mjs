// Builds understudyui.com into dist/: the pages in site/, plus the theme's own files, so the site
// always shows the examples and tokens as they are in this repo. It also turns CHANGELOG.md into
// /changelog and the feed at /changelog.xml, so the changelog is written once. Run: node scripts/build-site.mjs
import { cpSync, rmSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const SITE = "https://understudyui.com";

// Clear dist/ but keep dist/design-system, the Claude design system copy built by
// build-design-system.mjs: deleting it here hid which version was last published.
mkdirSync("dist", { recursive: true });
for (const entry of readdirSync("dist")) {
  if (entry !== "design-system") rmSync(`dist/${entry}`, { recursive: true, force: true });
}
cpSync("site", "dist", { recursive: true });
for (const path of ["tokens.css", "tokens.json", "components.css", "examples", "docs"]) {
  cpSync(path, `dist/${path}`, { recursive: true });
}

// CHANGELOG.md: "## YYYY-MM-DD: Title", a paragraph, optional pictures (one per line), "### Added|Changed|Fixed" lists,
// and a closing link. Only that much markdown is read: inline code, links and bold.
// "## Unreleased" at the top collects merged changes and is left off the site and the feed until
// scripts/release.mjs gives it a date and a title.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
const TAG = { Added: "us-tag us-tag-success", Changed: "us-tag", Fixed: "us-tag us-tag-outline", Removed: "us-tag us-tag-danger" };

const entries = readFileSync("CHANGELOG.md", "utf8").split(/^## /m).slice(1).filter((block) => !/^Unreleased\s*$/m.test(block.split("\n")[0])).map((block) => {
  const [headLine, ...lines] = block.trim().split("\n");
  const [, date, title] = headLine.match(/^(\d{4}-\d{2}-\d{2}):\s*(.+)$/) || [];
  if (!date) throw new Error(`CHANGELOG.md: a heading needs "## YYYY-MM-DD: Title", got "## ${headLine}"`);
  const entry = { date, title, lede: [], pictures: [], changes: [], source: null };
  let kind = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    let m;
    if ((m = t.match(/^### (\w+)/))) kind = m[1];
    else if ((m = t.match(/^- (.+)$/)) && kind) entry.changes.push([kind, m[1]]);
    else if ((m = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) entry.pictures.push({ alt: m[1], src: m[2] });
    else if ((m = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) entry.source = { label: m[1], href: m[2] };
    else if (!kind) entry.lede.push(t);
  }
  return entry;
});

const day = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const anchor = (iso) => `d${iso.replace(/-/g, "")}`;

// Pictures: the first runs full width, any others share a row at one height, each as wide as its
// shape. A PNG's size is read from its header so the row needs no layout script. A file named like
// the picture with "-dark" before the extension is shown in dark mode instead.
const pngSize = (src) => {
  try {
    const b = readFileSync(src);
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  } catch { return { w: 16, h: 10 }; }
};
const darkOf = (src) => src.replace(/(\.\w+)$/, "-dark$1");
const exists = (src) => { try { readFileSync(src); return true; } catch { return false; } };
const shot = (p) => {
  const { w, h } = pngSize(p.src);
  const dark = exists(darkOf(p.src)) ? `<source media="(prefers-color-scheme: dark)" srcset="${esc(darkOf(p.src))}">` : "";
  return `<figure class="shot${h > w ? " is-tall" : ""}" style="flex: ${(w / h).toFixed(3)}"><picture>${dark}<img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${w}" height="${h}" loading="lazy"></picture></figure>`;
};
const pictures = ([first, ...rest]) => !first ? "" :
  `<div class="shots">${shot(first)}${rest.length ? `<div class="shots-row">${rest.map(shot).join("")}</div>` : ""}</div>`;

// Changes, grouped by kind, each kind under its tag and a count. Past SHOW lines, the rest fold
// behind a "Show more" so a big release does not bury the ones below it.
const SHOW = 5;
const KINDS = ["Added", "Changed", "Fixed", "Removed"];
const items = (list) => list.map((text) => `<li>${inline(text)}</li>`).join("");
const groups = (changes) => [...KINDS, ...new Set(changes.map(([k]) => k).filter((k) => !KINDS.includes(k)))].map((kind) => {
  const list = changes.filter(([k]) => k === kind).map(([, text]) => text);
  if (!list.length) return "";
  const more = list.slice(SHOW);
  return `<section class="group">
        <h3><span class="${TAG[kind] || "us-tag"}">${esc(kind)}</span><span class="us-meta">${list.length}</span></h3>
        <ul class="changes">${items(list.slice(0, SHOW))}</ul>
        ${more.length ? `<details class="more"><summary class="us-text-btn"><i data-lucide="chevron-down" aria-hidden="true"></i><span>${more.length} more</span></summary><ul class="changes">${items(more)}</ul></details>` : ""}
      </section>`;
}).join("");

const html = entries.map((e, i) => `    <article class="entry${i === 0 ? " is-latest" : ""}" id="${anchor(e.date)}">
      <div class="when">
        <a class="us-meta" href="#${anchor(e.date)}"><time datetime="${e.date}">${day(e.date)}</time></a>
        ${i === 0 ? `<span class="us-tag us-tag-outline">Latest</span>` : ""}
      </div>
      <div class="body">
        <h2>${inline(e.title)}</h2>
        ${e.lede.length ? `<p class="lede">${inline(e.lede.join(" "))}</p>` : ""}
        ${pictures(e.pictures)}
        ${groups(e.changes)}
        ${e.source ? `<a class="us-meta source" href="${esc(e.source.href)}">${esc(e.source.label)} <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>` : ""}
      </div>
    </article>`).join("\n");
const total = entries.reduce((n, e) => n + e.changes.length, 0);
const first = entries[entries.length - 1];
const summary = `<p class="us-meta summary">${entries.length} releases and ${total} changes since ${day(first.date)}.</p>`;
const page = readFileSync("site/changelog.html", "utf8").replace("<!--SUMMARY-->", summary).replace("<!--ENTRIES-->", html);
writeFileSync("dist/changelog.html", page);

// The homepage's "Updated" line under the hero, from the newest entry.
const latest = entries[0];
const short = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const home = readFileSync("site/index.html", "utf8").replace("<!--LATEST-->",
  `<a class="us-meta latest" href="changelog#${anchor(latest.date)}">Updated ${short(latest.date)}: ${inline(latest.title.charAt(0).toLowerCase() + latest.title.slice(1))}<i data-lucide="arrow-right" aria-hidden="true"></i></a>`);
writeFileSync("dist/index.html", home);

const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0"><channel>
<title>Understudy changelog</title>
<link>${SITE}/changelog</link>
<description>What changed in Understudy, newest first.</description>
${entries.map((e) => `<item>
<title>${esc(e.title)}</title>
<link>${SITE}/changelog#${anchor(e.date)}</link>
<guid isPermaLink="false">understudy-${e.date}</guid>
<pubDate>${new Date(`${e.date}T17:00:00Z`).toUTCString()}</pubDate>
<description>${esc([e.lede.join(" "), ...e.changes.map(([k, t]) => `${k}: ${t.replace(/`/g, "")}`)].join("\n"))}</description>
</item>`).join("\n")}
</channel></rss>
`;
writeFileSync("dist/changelog.xml", rss);


// The sitemap and robots.txt, so search engines find the changelog as well as the homepage.
// Both pages change with each release, so they carry its date.
const urls = ["", "/changelog"].map((path) => `<url><loc>${SITE}${path}</loc><lastmod>${latest.date}</lastmod></url>`);
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built dist/, with ${entries.length} changelog entries`);
