# Progress

A 6px pill bar on a `bg-muted` track, its segments in the flat traffic light colors (`light-green`, `light-amber`, `light-red`); tags and text keep the darker `success`, `warning` and `danger`. Stack segments for a split result in this order: `is-success`, `is-warning` (in motion), `is-danger`, `is-muted`, widths as percentages.

- Always pair it with the number in words ("7 of 19 reviewed").
- Set `role="progressbar"` with `aria-valuenow` and `aria-valuemax`.
- In a table, use `us-progress-cell`: a short bar, then a count such as "3 of 8 done".
