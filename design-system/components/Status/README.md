# Status

A status dot, then the word. The dots mean one thing on every page: hollow for open or not started, `is-warning` (amber) for in motion, `is-success` for done, `is-danger` for something that needs someone, `is-muted` for parked.

- Markup: `<span class="us-status"><span class="us-dot is-warning"></span>In motion</span>`.
- Use it in tables and lists instead of tags. Never show a dot without its word, except in a Split row, where the list's key explains them.
- Amber is the one colour beyond the greys, red and green, because a grey in-progress dot read as nothing happening.
- The coloured dots are 10px and built like the macOS window buttons: a gradient, a darker rim and a faint shadow. Chosen, not measured from the app.
