# Icon

Lucide outline icons at 16px with a 1.75 stroke in `currentColor`, beside a label. Load `https://cdn.jsdelivr.net/npm/lucide@0.460.0/dist/umd/lucide.min.js`, write `<i data-lucide="check" aria-hidden="true"></i>` where an icon goes, and call `lucide.createIcons({ attrs: { "stroke-width": 1.75 } })` after each render, guarded with `window.lucide?.`.

- On action buttons the icon goes before the verb; on links that leave the page, `arrow-up-right` goes after the text, both wrapped in `us-iconed`.
- Icons are `aria-hidden`; the label carries the meaning. An icon-only button (`us-icon-btn`) needs an `aria-label`.
