# Split

A list of records on the left and the selected one on the right, for working through many similar things one at a time: a request tracker, a review queue.

- **List** (`us-split-col` > `us-split-list`): packed rows closed by hairlines. `us-split-group` is a grey band, a button with `is-toggle` and `aria-expanded` when it folds, its count in `us-split-count`. `us-split-heading` is a bold group row, `us-split-row` a record: a `us-dot`, the name in `us-split-name`, a short date in `us-split-when` ("3d", "2w"). Add `us-split-sub` only when the grouping hides where a record came from.
- The selected row is `bg-selection` with `on-selection` text. Arrow keys move the selection.
- **Detail** (`us-split-detail`): wrap it in `us-split-page` (at most `content-width`, centred). `us-record-title`, `us-record-where`, then the text; quoted texts go in `us-record-text`.
- **Decision**: when each record needs one, dock it at the bottom like the message composer (`us-dock`, `us-composer`, `us-composer-actions`).
- **Around it**: `us-tracker` across the top with the set's name, a progress bar and the count. It is at least `top-bar-height`, so its hairline meets the nav's top band. Under 760px the list stacks above the detail.
