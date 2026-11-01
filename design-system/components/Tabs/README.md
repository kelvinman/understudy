# Tabs

A segmented control for switching views or filters inside one page, on a `bg-muted` track.

- `<div class="us-tabs" role="group"><button class="us-tab" aria-pressed="true">All</button>…</div>`. Use `role="tablist"` and `aria-selected` when the tabs swap whole panels.
- The selected tab lifts to `bg` with a `border-subtle` ring; the rest are `text-secondary`.
- Two to five short labels. More than five: use a List in a side rail instead.
