#!/usr/bin/env node
// Builds Understudy as a Claude design system: the files a Design System artifact keeps under project/,
// written to dist/design-system/project/. Tokens, styles and the brand book come from this repo as they are;
// each component's guidelines and live preview come from design-system/components/. The artifact is a copy:
// change the repo, run this, then publish the folder to the artifact. It is marked "editing": "code", so the
// artifact's page is read-only and nobody edits the copy by hand.
//
//   node scripts/build-design-system.mjs
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist", "design-system", "project");
const read = (f) => readFileSync(join(ROOT, f), "utf8");
const sha = execFileSync("git", ["-C", ROOT, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
const GITHUB = "https://github.com/kelvinman/understudy";

rmSync(join(ROOT, "dist", "design-system"), { recursive: true, force: true });
mkdirSync(join(OUT, "components"), { recursive: true });

// Tokens: already in the shape the artifact reads; add where they came from.
const tokens = JSON.parse(read("tokens.json"));
tokens.meta = { ...tokens.meta, repo: "kelvinman/understudy", ref: `main@${sha}` };
writeFileSync(join(OUT, "tokens.json"), JSON.stringify(tokens, null, 2) + "\n");

// Styles: components.css is the bundle stylesheet; there is no script bundle. tokens.css goes alongside, since every
// value in the bundle is one of its variables and a Design canvas loads it first.
writeFileSync(join(OUT, "components", "bundle.css"), read("components.css"));
writeFileSync(join(OUT, "tokens.css"), read("tokens.css"));

// Brand book: the repo README, minus what only makes sense on GitHub.
let readme = read("README.md")
  .replace(/<picture>[\s\S]*?<\/picture>\n\n/, "")
  .replace(/## What is in here\n[\s\S]*?(?=## How to use it)/, "")
  .replace(/\(examples\//g, `(${GITHUB}/blob/main/examples/`)
  .replace(/\(LICENSE\)/g, `(${GITHUB}/blob/main/LICENSE)`);
readme = readme.replace(
  /It is plain CSS:[^\n]*\n/,
  `It is plain CSS: a set of design tokens and one stylesheet of components. Here the tokens are under Colors, Typography and Spacing, the stylesheet is loaded as the components' CSS, and each component has its own page. The source, the five example pages and the changelog are at [github.com/kelvinman/understudy](${GITHUB}).\n`,
);
readme += `\n## Consuming this system\n\nNamespace: \`understudy\`. Plain CSS, no script bundle and no global. On a Design canvas, install \`tokens.css\`, \`tokens.json\` and \`components/bundle.css\`, and load \`tokens.css\` then \`components/bundle.css\` in each artboard, with the fonts above in its \`<helmet>\`. Classes are prefixed \`us-\`; each component's page shows its markup.\n`;
readme += `\n## About this copy\n\nBuilt from [kelvinman/understudy](${GITHUB}) at ${sha} by \`scripts/build-design-system.mjs\`, and read-only here: change the repo, then rebuild. The component pages are static renditions of the \`us-\` classes with sample content. Figtree and Source Serif 4 load from Google Fonts; there are no font files.\n`;
writeFileSync(join(OUT, "README.md"), readme);

// Component guidelines and previews.
const comps = readdirSync(join(ROOT, "design-system", "components"));
for (const c of comps) cpSync(join(ROOT, "design-system", "components", c), join(OUT, "components", c), { recursive: true });

// The index. createdOnFiles stays fixed: it marks when the artifact was first made from these files.
writeFileSync(join(OUT, "design-system.json"), JSON.stringify({
  v: 3,
  layout: "files",
  createdOnFiles: { v: 1, at: "2026-11-01T03:00:00Z" },
  title: "Understudy",
  namespace: "Understudy",
  editing: "code",
  libraries: [],
  sections: {},
  groups: [],
  assetGroups: {},
  blobs: {},
  docs: { readme: "project/README.md", sections: [] },
  lastChange: { by: "Kelvin Man", at: new Date().toISOString().replace(/\.\d+Z$/, "Z"), via: `GitHub · kelvinman/understudy@${sha}`, note: "Built from the repo by scripts/build-design-system.mjs." },
}, null, 1) + "\n");

console.log(`Wrote dist/design-system/project from ${sha}: ${comps.length} components`);
