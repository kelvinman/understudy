# Hairline

A theme for Claude artifacts that makes them look like part of the Claude desktop app. Same white ground as the chat beside them, the same neutral greys, quiet bordered controls and 16px text, and dark mode tuned for how the artifact pane draws color. Nothing on the page announces itself as a separate website.

It is plain CSS: a set of design tokens, one stylesheet of components, and five example pages, one per layout.

This is an independent project. It is not made by, affiliated with or endorsed by Anthropic.

## What is in here

| File | What it is |
|---|---|
| `tokens.json` | Every color, type style, space, radius and size, with a note on where each one is used and where its value came from. The source of truth. |
| `tokens.css` | CSS custom properties built from `tokens.json`: light on `:root`, dark under `prefers-color-scheme` and under `data-theme="dark"`. |
| `components.css` | Buttons, fields, tags, tabs, lists, cards, progress, steps, tables, panels, file lists and the split list-and-detail view, as `hl-` classes. |
| `examples/` | One page per layout preset, below. Open any of them in a browser. |
| `scripts/build-tokens.mjs` | Rebuilds `tokens.css` after you change `tokens.json`: `node scripts/build-tokens.mjs`. |

## How to use it

Artifacts can't load files from somewhere else, so everything goes inline.

**By hand.** Paste `tokens.css` at the top of the page's `<style>`, then the parts of `components.css` the page uses. Add the fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400..600&display=swap">
<!-- Workspace pages only -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400&display=swap">
```

and, if the page uses icons, Lucide:

```html
<script src="https://cdn.jsdelivr.net/npm/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<script>window.lucide?.createIcons({ attrs: { "stroke-width": 1.75 } });</script>
```

**With an agent.** Point it at this README and the example closest to what you want, and ask it to inline the tokens and the classes it uses. The rules below are written so an agent can follow them.

## Layout presets

Every page: `body` on `bg`, a side gutter of `max(16px, env(safe-area-inset-left))` and the same on the right, `<meta name="claude:viewport-fit-sides" content="cover">`, and both themes from `tokens.css`.

- **Tool or tracker** ([examples/tool.html](examples/tool.html)). A review page, a checklist, a log. Up to 1080px wide. A short header, then a sticky bar with progress, counts and filter tabs. Items are open rows split by full-width hairlines, text on the left and controls on the right; the two columns stack under 860px. No cards around items.
- **Report** ([examples/report.html](examples/report.html)). Findings, a comparison, a write-up. One 760px column, a title and a date line, sections 32px apart. A key number goes in one card at the top, never a row of tiles.
- **Short page** ([examples/short-page.html](examples/short-page.html)). A note, a link list, a one-screen answer. Same column as the report, nothing sticky.
- **Workspace, cards** ([examples/workspace-cards.html](examples/workspace-cards.html)). Reference material or many records: a token list, settings, a file browser. A 240px nav on the left, panels on a grey canvas on the right, each opening with a serif title.
- **Workspace, full width** ([examples/workspace-full-width.html](examples/workspace-full-width.html)). One working surface you move through, such as a review queue. The same nav, then no canvas and no cards: a tracker across the top and a split list and detail below it, with resizable columns, a status dot per record and the decision docked at the bottom like a message composer.

When unsure between the two Workspace layouts, pick full width for tools you work in and cards for pages you read or scan.

## Rules

**Copy.** Short, plain, sentence case: "Request changes", not "Request Changes". Labels are nouns, buttons are verbs. No emoji, no exclamation marks.

**Color.** Neutral greys with no hue. Text is `text`; anything secondary is `text-secondary`, never lighter. Links are `link`, the one cool blue. `success` and `danger` mean approved and removed, nothing else, and always come with a word. There is no brand accent; the strongest thing on a page is `strong`.

**Type.** One sans family at weight 450. Body 16/24, controls 15/20, meta 14/20, tags 12/16. Headings are body size at weight 600, not bigger; only the page title is 22/30. Nothing a person reads goes below 14px, except labels in the Workspace nav. The serif is for Workspace titles only.

**Spacing and shape.** A 4px base. Controls are 32px tall. Hairlines are 1px and run edge to edge of the pane (`hl-rule`). Corners: 6px on tags and tabs, 8px on buttons and rows, 12px on inputs and cards, 20px on Workspace panels. No shadows on content.

**States.** Hover darkens the border or adds `bg-muted`. Focus is a 2px `focus` ring with a 2px offset on buttons, tabs, rows and links. Text fields take no ring, like the app's composer: the border steps up instead.

**Motion.** Almost none: 150 to 300ms ease-out on widths and colors, off under reduced motion.

**Icons.** Lucide outlines at 16px with a 1.75 stroke in `currentColor`, beside a label, never alone where a word would be clearer. Before the verb on action buttons, after the text on links that leave the page, before the thing a meta line names.

## What was measured and what was assumed

Measured from screenshots of the Claude desktop app in October 2026: the light theme colors, the 16px body text (checked against the chat and file viewer beside an open artifact), the 32px rows and the 8px and 12px corners. Dark values were measured from the app in dark mode.

The artifact pane draws dark colors about a third lighter than the code sets them (`#1c1c1c` shows as `#252525`). So dark surfaces, lines and the link color are set a step lower than they appear, to land on the app's colors inside the pane. In an ordinary browser, dark mode looks a touch darker than the app.

Assumed, not measured: the typefaces (the app's own are not available, so Figtree and Source Serif 4 stand in as the closest open matches), the 6px tag radius, the motion timings, and a few dark values marked in `tokens.json`.

The app will change. When it does, these values will drift until someone measures again. Pull requests with fresh measurements are welcome; say what you measured and how.

## Credits and licenses

Made by [Kelvin Man](https://kelvinman.com). Released under the [MIT license](LICENSE).

Hairline loads these from public CDNs and does not bundle them:

- [Figtree](https://fonts.google.com/specimen/Figtree) by Erik Kennedy, SIL Open Font License 1.1.
- [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) by Adobe, SIL Open Font License 1.1.
- [Lucide](https://lucide.dev) icons, ISC license.

Claude is a trademark of Anthropic. It is named here only to say what the theme is for.
