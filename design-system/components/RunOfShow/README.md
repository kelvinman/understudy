# Run of show

A page for anything run in time order: a demo, a talk, a workshop, a walkthrough on a call. A timeline strip at the top, then one beat per section, each with its time range and title, a drawn screen on the left and the notes on the right.

- Timeline: `<nav class="us-timeline">` of links, one per beat, `style="--us-span:90"` for its length (seconds, or any unit, as long as all segments use the same one), `is-live` on the beats done by hand. Under it, `us-timeline-key` with a `us-timeline-swatch` (and `is-live`) per shade.
- Beat: `<section class="us-beat" id="…">` with `us-beat-head` (`us-beat-time` "1:30 to 3:00", then `h2.us-beat-title`, then a tag if needed), a `us-screen`, then `us-beat-notes`. Notes are short labelled parts, each a `us-beat-label` above a `p`: On screen, Do, Say. What is said goes in `us-beat-say`, in the serif.
- Screen: `us-screen` with `us-screen-bar` (`us-screen-dots` of three empty spans, `us-screen-title`), then any content, drawn with the page's own classes rather than a screenshot. For a terminal, `us-screen-term`, one text line per line: `us-term-cmd` for what was typed, `us-term-dim` for working lines, `us-term-ok` for the line that says it worked, `us-term-link`, and `us-term-caret` at the end.
- Up to 1000px wide. Under 860px the notes go under the screen. Close the page with prep and fallback lists.
