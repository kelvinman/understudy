# Button

A quiet bordered button, the way the app draws its own controls. Use the bordered default for most actions, `us-btn-filled` for one that should sit back, `us-btn-ghost` for toolbar actions, and `us-btn-primary` at most once per view.

- Markup: `<button class="us-btn">Approve</button>`. The label is a verb in sentence case.
- Toggles use `aria-pressed`; pressed fills with `strong`. Add `us-btn-success` or `us-btn-danger` when the choice is a verdict, so pressed takes `success` or `danger`.
- `us-btn-sm` is a 28px button for table rows and filter bars. The default is `control-height` (32px), corners `radius-md`, text 15px.
- Never put two primary buttons side by side. Never show which toggle is on by color alone: the fill changes too.
