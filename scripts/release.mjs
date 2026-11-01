// Turns "## Unreleased" in CHANGELOG.md into a dated entry, so the site and the feed show it, and starts
// a new, empty Unreleased section above it. Changes collect under Unreleased as they merge; this runs
// when they are worth announcing, usually once a week.
// Run: node scripts/release.mjs "Title" "One paragraph on what changed and why."
import { readFileSync, writeFileSync } from "node:fs";

const [title, lede] = process.argv.slice(2);
if (!title || !lede) throw new Error('Usage: node scripts/release.mjs "Title" "One paragraph."');
const text = readFileSync("CHANGELOG.md", "utf8");
const m = text.match(/^## Unreleased[ \t]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
if (!m) throw new Error("CHANGELOG.md has no \"## Unreleased\" section");
const body = m[1].trim();
if (!/^### /m.test(body)) throw new Error("Nothing under Unreleased to release");
const date = new Date().toLocaleDateString("en-CA");
const entry = `## Unreleased\n\n## ${date}: ${title}\n\n${lede}\n\n${body}\n\n`;
writeFileSync("CHANGELOG.md", text.replace(m[0], entry));
console.log(`Released "${title}" as ${date}`);
