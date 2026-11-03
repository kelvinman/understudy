# Sheet

A panel that slides in from the right over a dimmed page, for reading one record without losing your place in the list behind it, such as a company's dossier behind its card.

- The head is as tall as the top bar: the record's name (`us-sheet-title`), a grey meta line such as when it was updated, and a close button on the right (`us-sheet-close`). The body scrolls on its own; markdown goes in `us-prose`.
- 680px wide, full width on a phone. Add `is-open` to the sheet and to `us-sheet-scrim` together.
- Escape, a click on the scrim or the close button shuts it, and focus goes back to what opened it. On open, focus moves to the close button and the body scrolls to the top.
- One sheet at a time. For a record you work through in order, use Split instead.
