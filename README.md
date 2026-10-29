# Understudy

A theme for Claude artifacts that makes them look like part of the Claude desktop app. Same white ground as the chat beside them, the same neutral greys, quiet bordered controls and 16px text, and dark mode tuned for how the artifact pane draws color. Nothing on the page announces itself as a separate website.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/preview-dark.png">
  <img src="docs/preview-light.png" alt="The full-width Workspace example: a customer request tracker with Group by and Show filters in the sidebar, a list of requests grouped by the need they share with a status dot and age on each, and the selected request with its status, who asked, why, what was committed, the other customers with the same ask and its issue.">
</picture>

It is plain CSS: a set of design tokens, one stylesheet of components, and five example pages, one per layout. The picture above is [examples/workspace-full-width.html](examples/workspace-full-width.html); it switches to dark with your GitHub theme.

This is an independent project. It is not made by, affiliated with or endorsed by Anthropic.

## What is in here

| File | What it is |
|---|---|
| `tokens.json` | Every color, type style, space, radius and size, with a note on where each one is used and where its value came from. The source of truth. |
| `tokens.css` | CSS custom properties built from `tokens.json`: light on `:root`, dark under `prefers-color-scheme` and under `data-theme="dark"`. |
| `components.css` | A base section every page needs, then one section per component, as `us-` classes. The components are listed below. |
| `examples/` | One page per layout preset, below. Open any of them in a browser. |
| `scripts/build-tokens.mjs` | Rebuilds `tokens.css` after you change `tokens.json`: `node scripts/build-tokens.mjs`. |
| `site/`, `scripts/build-site.mjs` | The website, [understudyui.com](https://understudyui.com). The build copies in the tokens, components and examples above, so the site always shows them as they are here. |
| `brand/` | The mark, wordmark and lockups as SVG, the avatar, banner and link preview, and a template for posts. |

## How to use it

Artifacts can't load files from somewhere else, so everything goes inline.

**By hand.** Paste `tokens.css` at the top of the page's `<style>`. Then paste the **Base** section of `components.css` (the page background, links, the focus ring, text field focus and icon size), which every page needs, then the sections for the components the page uses. Each component's rules sit under one comment naming it, so a section can be copied on its own; where one builds on another, its comment says what it needs. Add the fonts:

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

**With an agent.** Point it at this README and the example closest to what you want, and ask it to inline the tokens, the Base section and the component sections it uses. The rules below are written so an agent can follow them.

## Components

Each is one section of `components.css`.

| Component | Classes |
|---|---|
| Button | `us-btn`, with `us-btn-filled`, `us-btn-ghost`, `us-btn-primary`, `us-btn-success`, `us-btn-danger`, and `us-btn-sm` for a 28px button in table rows and filter bars. Toggles use `aria-pressed`. |
| Text input, textarea | `us-input`, `us-textarea` |
| Search field | `us-search`: a label around an icon and an `input type="search"`. |
| Select | `us-select`: a span around a native `select`; add `is-set` while it filters something. |
| Checkbox | `us-check`: a label around a native checkbox and its text. |
| Filter bar | `us-filters`: one wrapping row of search, selects, toggles and checkboxes, with `us-filters-end` and `us-filters-count` for the count on the right. |
| Tag | `us-tag`, with `us-tag-outline`, `us-tag-success`, `us-tag-danger` |
| Tabs | `us-tabs`, `us-tab` |
| List | `us-list`, `us-list-label`, `us-row`, `us-row-meta`, `us-row-action` |
| Card, quote, divider, rule | `us-card`, `us-quote`, `us-divider`, `us-rule` |
| Progress | `us-progress`, its parts `is-success`, `is-danger`, `is-muted` |
| Meta line | `us-meta`, `us-iconed` |
| Diff | `ins.us-ins`, `del.us-del` |
| Steps | `us-steps`, `us-step-num` |
| Status dot | `us-dot`: hollow when open, or `is-success`, `is-danger`, `is-muted` |
| Workspace | `us-workspace` (add `is-flat` for full width), `us-workspace-nav`, `us-workspace-main`, `us-canvas` |
| Panel | `us-panel`, `us-panel-head`, `us-display`, `us-section-head` |
| Table | `us-table`, `us-table-wrap`, `us-num`, `us-name` |
| Table groups | `us-table-group` (the heading row), `us-table-toggle` (its button, with a chevron), `us-table-count`. One `tbody` per group; the button's `aria-expanded` folds it. |
| Token value, file list, detail | `us-value`, `us-swatch`, `us-files`, `us-file`, `us-detail` |
| Tracker | `us-tracker`, `us-tracker-name`, `us-tracker-count` |
| Split | `us-split`, `us-split-col`, `us-split-list`, `us-split-group`, `us-split-heading`, `us-split-row`, `us-split-detail` |
| Record | `us-record-title`, `us-record-where`, `us-record-text` |
| Dock and composer | `us-dock`, `us-composer`, `us-composer-actions` |
| Quote button, drag strip | `us-quote-btn`, `us-drag` |

## Layout presets

Every page: `body` on `bg`, a side gutter of `max(16px, env(safe-area-inset-left))` and the same on the right, `<meta name="claude:viewport-fit-sides" content="cover">`, and both themes from `tokens.css`.

- **Tool or tracker** ([examples/tool.html](examples/tool.html)). A review page, a checklist, a log. Up to 1080px wide. A short header, then a sticky bar with progress, counts and filter tabs. Items are open rows split by full-width hairlines, text on the left and controls on the right; the two columns stack under 860px. No cards around items.
- **Report** ([examples/report.html](examples/report.html)). Findings, a comparison, a write-up. One 760px column, a title and a date line, sections 32px apart. A key number goes in one card at the top, never a row of tiles.
- **Short page** ([examples/short-page.html](examples/short-page.html)). A note, a link list, a one-screen answer. Same column as the report, nothing sticky.
- **Workspace, cards** ([examples/workspace-cards.html](examples/workspace-cards.html)). A home page across many records: a project desk, settings, a file browser. A 240px nav on the left, a filter bar across the top, then panels on a grey canvas, each opening with a serif title. The example is a desk of projects: each panel holds a table grouped by area under folding headings, each row the project with a one-line status, its stage as a tag, when it was last touched and a small Copy prompt button that copies a prompt for starting a new Claude session on it. On a phone the table rows stack.
- **Workspace, full width** ([examples/workspace-full-width.html](examples/workspace-full-width.html)). One working surface you move through, such as a request tracker or a review queue. The same nav, then no canvas and no cards: a tracker across the top and a split list and detail below it, with resizable columns, folding groups and a status dot per record. The example tracks customer requests: the nav groups them by the shared ask or by customer and filters them by status, and the detail shows why they asked, what was committed, the other customers with the same ask and the issue. When each record needs a decision, dock it at the bottom of the detail like a message composer (`us-dock`, `us-composer`).

When unsure between the two Workspace layouts, pick full width for tools you work in and cards for pages you read or scan.

## Rules

**Copy.** Short, plain, sentence case: "Request changes", not "Request Changes". Labels are nouns, buttons are verbs. No emoji, no exclamation marks.

**Color.** Neutral greys with no hue. Text is `text`; anything secondary is `text-secondary`, never lighter. Links are `link`, the one cool blue. `success` and `danger` mean approved and removed, nothing else, and always come with a word. There is no brand accent; the strongest thing on a page is `strong`.

**Type.** One sans family at weight 450. Body 16/24, controls 15/20, meta 14/20, tags 12/16. Headings are body size at weight 600, not bigger; only the page title is 22/30. Nothing a person reads goes below 14px, except labels in the Workspace nav. The serif is for Workspace titles only.

**Spacing and shape.** A 4px base. Controls are 32px tall. Hairlines are 1px and run edge to edge of the pane (`us-rule`). Corners: 6px on tags and tabs, 8px on buttons and rows, 12px on inputs and cards, 20px on Workspace panels. No shadows on content.

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

Understudy loads these from public CDNs and does not bundle them:

- [Figtree](https://fonts.google.com/specimen/Figtree) by Erik Kennedy, SIL Open Font License 1.1.
- [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) by Adobe, SIL Open Font License 1.1.
- [Lucide](https://lucide.dev) icons, ISC license.

Claude is a trademark of Anthropic. It is named here only to say what the theme is for.
