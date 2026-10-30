// Builds understudyui.com into dist/: the pages in site/, plus the theme's own files, so the site
// always shows the examples and tokens as they are in this repo. It also turns CHANGELOG.md into
// /changelog and the feed at /changelog.xml, so the changelog is written once. Run: node scripts/build-site.mjs
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SITE = "https://understudyui.com";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
cpSync("site", "dist", { recursive: true });
for (const path of ["tokens.css", "tokens.json", "components.css", "examples", "docs"]) {
  cpSync(path, `dist/${path}`, { recursive: true });
}

// CHANGELOG.md: "## YYYY-MM-DD: Title", a paragraph, an optional picture, "### Added|Changed|Fixed" lists,
// and a closing link. Only that much markdown is read: inline code, links and bold.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
const TAG = { Added: "us-tag us-tag-success", Changed: "us-tag", Fixed: "us-tag us-tag-outline", Removed: "us-tag us-tag-danger" };

const entries = readFileSync("CHANGELOG.md", "utf8").split(/^## /m).slice(1).map((block) => {
  const [headLine, ...lines] = block.trim().split("\n");
  const [, date, title] = headLine.match(/^(\d{4}-\d{2}-\d{2}):\s*(.+)$/) || [];
  if (!date) throw new Error(`CHANGELOG.md: a heading needs "## YYYY-MM-DD: Title", got "## ${headLine}"`);
  const entry = { date, title, lede: [], picture: null, changes: [], source: null };
  let kind = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    let m;
    if ((m = t.match(/^### (\w+)/))) kind = m[1];
    else if ((m = t.match(/^- (.+)$/)) && kind) entry.changes.push([kind, m[1]]);
    else if ((m = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) entry.picture = { alt: m[1], src: m[2] };
    else if ((m = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/))) entry.source = { label: m[1], href: m[2] };
    else if (!kind) entry.lede.push(t);
  }
  return entry;
});

const day = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const anchor = (iso) => `d${iso.replace(/-/g, "")}`;

const html = entries.map((e) => `    <article class="entry" id="${anchor(e.date)}">
      <time class="us-meta" datetime="${e.date}">${day(e.date)}</time>
      <h2>${inline(e.title)}</h2>
      ${e.lede.length ? `<p>${inline(e.lede.join(" "))}</p>` : ""}
      ${e.picture ? `<figure class="shot"><img src="${esc(e.picture.src)}" alt="${esc(e.picture.alt)}" loading="lazy"></figure>` : ""}
      <ul class="changes">${e.changes.map(([k, text]) => `<li><span class="${TAG[k] || "us-tag"}">${esc(k)}</span><span>${inline(text)}</span></li>`).join("")}</ul>
      ${e.source ? `<a class="us-meta source" href="${esc(e.source.href)}">${esc(e.source.label)} <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>` : ""}
    </article>`).join("\n");
const page = readFileSync("site/changelog.html", "utf8").replace("<!--ENTRIES-->", html);
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

console.log(`Built dist/, with ${entries.length} changelog entries`);
