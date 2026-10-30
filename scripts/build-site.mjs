// Builds understudyui.com into dist/: the pages in site/, plus the theme's own files, so the site
// always shows the examples and tokens as they are in this repo. Run: node scripts/build-site.mjs
import { cpSync, rmSync, mkdirSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
cpSync("site", "dist", { recursive: true });
for (const path of ["tokens.css", "tokens.json", "components.css", "examples", "docs"]) {
  cpSync(path, `dist/${path}`, { recursive: true });
}
console.log("Built dist/");
