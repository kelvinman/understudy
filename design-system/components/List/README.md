# List

Rows drawn like the app's sidebar: no dividers, 32px rows, a soft fill on hover, `bg-selected` on the current one.

- `<nav class="us-list"><div class="us-list-label">Recent</div><a class="us-row" aria-current="true">…</a></nav>`.
- A count or date goes in `us-row-meta`, right-aligned in `text-secondary`; one action in `us-row-action`.
- Section labels are 14px `text-secondary`, sentence case.
- For records with several fields, use a Table or a Split instead.
