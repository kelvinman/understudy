# Tab select and menu

A filter that picks one value out of several, drawn to sit in a row of tabs: a `us-tab-select` button with a chevron that opens a `us-menu` below it.

- The button shows the value it holds ("All areas", "Design") and is as wide as that value. Add `is-set` while it filters something, so it lifts like a pressed tab and a Clear link can appear beside the row.
- The menu is drawn by the page, not the browser, so it always opens below the button. A native select on macOS opens over the button, which hides what you clicked.
- Items are `us-menu-item` buttons, one line each. The chosen one ends with a check icon; or every item ends with a count (`us-menu-count`) when the count helps choose. Open from the right edge with `is-end` when the button sits at the right of the page.
- Keyboard: Enter or a click opens it with focus on the chosen item, arrow keys move, Escape or a click outside closes it and returns focus to the button.
- A toggle beside it is a plain `us-tab` with `aria-pressed`; a tab can end with a `us-tab-count`, in `is-danger` when it counts something that needs attention.
- The menu is the one place in Understudy with a shadow, because it floats over the page.
