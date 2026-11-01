# Table

Records in rows, like the app's token tables: 56px rows, a quiet header in `text-placeholder`, hairlines between rows and columns, inside a Panel.

- Markup: `<div class="us-table-wrap"><table class="us-table">…</table></div>`. Names and ids in `us-name` (mono), numbers in `us-num`, right-aligned with tabular figures. A colour value as `us-value` with a `us-swatch`.
- **A table people work in.** One fact per column. `is-fixed` and a `colgroup` so nothing shifts; `is-wrap` on a cell that must wrap. Every header is a `us-th-sort` button with `aria-sort` on the sorted one. A `us-drag` in each header but the last resizes columns, with `--us-table-h` set from a ResizeObserver and `is-resizable` on the wrap. The first cell's `us-row-toggle` opens `us-table-child` rows in the same columns.
- People as `us-person` with a `us-avatar`: coloured initials, one of `is-orange`, `is-pink`, `is-blue`, `is-green`, `is-purple` or `is-teal` per person and the same one everywhere (`is-none` for nobody, with a grey "Unassigned"); status as `us-status`; progress as `us-progress-cell`.
- Group rows with `us-table-group`, one `tbody` per group, folding from `us-table-toggle`.
