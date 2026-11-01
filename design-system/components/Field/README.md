# Field

Text inputs and text areas drawn like the app's message composer: `bg-input` fill, `border`, `radius-lg`.

- `<input class="us-input" id="…">` for one line, `<textarea class="us-textarea" id="…">` for longer text. `us-search`, `us-select` and `us-check` cover search, select and checkbox.
- Every field gets a stable `id` and a visible label in `us-meta` above it, or an `aria-label`.
- Placeholder text uses `text-placeholder` and says what to write. Never put instructions only in the placeholder.
- No focus ring, as in the composer: the border steps up to `border-strong`.
- Text is 15px so the field matches the buttons beside it. On phones, set 16px to stop iOS zooming.
