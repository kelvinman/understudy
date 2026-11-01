# Steps

A short list of steps, rules or checks in one bordered card, like the app's task list in the chat: `border-subtle` outline, `radius-lg`, 28px rows, a 14px marker before each row.

- Markup: `<ol class="us-steps"><li><span class="us-step-num">01</span>Say what changed</li>…</ol>`.
- A zero-padded number in `us-step-num` when order matters; a Lucide icon when each row has a state: `circle-dashed` to do, `loader-circle` in progress, `circle-check` done (add `is-done` to grey the row).
- For 3 to 12 short items, one line each. Longer items are paragraphs.
