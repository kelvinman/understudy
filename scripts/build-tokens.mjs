// Builds tokens.css from tokens.json: light values on :root, dark values for
// prefers-color-scheme (unless the page sets data-theme="light") and for data-theme="dark".
// Run: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url);
const t = JSON.parse(readFileSync(new URL("tokens.json", root), "utf8"));

const light = [];
const dark = [];
for (const c of t.color.tokens) {
  light.push(`--${c.name}: ${c.value.light};`);
  dark.push(`--${c.name}: ${c.value.dark};`);
}
for (const [k, v] of Object.entries(t.type.families)) light.push(`--font-${k}: ${v};`);
for (const group of ["spacing", "radius", "size"]) {
  for (const s of t[group].tokens) light.push(`--${s.name}: ${s.value};`);
}

// Both families in one request. An @import only counts at the very top of a stylesheet, so it lives here,
// in the file every page pastes first, and pasting tokens.css is enough to load the fonts.
const FONTS = "https://fonts.googleapis.com/css2?family=Figtree:wght@400..600&family=Source+Serif+4:opsz,wght@8..60,400&display=swap";

const block = (lines, indent) => lines.map((l) => indent + l).join("\n");
const css = `/* Generated from tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */
@import url("${FONTS}");
:root {
${block(light, "  ")}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${block(dark, "    ")}
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
${block(dark, "  ")}
  color-scheme: dark;
}
`;
writeFileSync(new URL("tokens.css", root), css);
console.log("Wrote tokens.css");
