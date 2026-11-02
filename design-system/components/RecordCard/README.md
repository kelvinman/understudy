# Record card

One card per record, in a `us-cards` grid, for a page you scan across many records of one kind: suppliers, companies, projects. For records you work through one by one, use Split instead.

- Every card has the same rows in the same places: the head, a two-line summary, one row of facts, then a list under a hairline. Cards in a row are as tall as the tallest, so the rows line up across the grid.
- The head is a 22px logo (or the first letter on `bg-muted`), the name as a link, small icon links beside it (`us-record-card-ic`, 15px, `text-secondary`), and tags pushed to the right. Say the record's state in a tag.
- The summary is exactly two lines; longer text is cut and shown in full on hover. Never let a third line show through.
- Facts lead with an icon (a pin for a place, a globe for remote, a banknote for pay). The second fact keeps its full width and the first is cut, so put the one that must stay whole second, and show only its essential part, such as a range without its notes.
- The list holds only what is current, one item per line, with a short age on the right ("3w"). Show three items, or two and "N more". When nothing is current, one grey line says so, and may name what there was before.
- `is-success` gives an open or live record a green-tinted border; `is-quiet` greys a record with nothing current; `is-button` when the whole card opens something on click.
