# FileList

Files or records under group labels with a detail beside them: 44px rows (`file-row-height`) with a 20px icon, a name and a meta line, the size on the right, one selected row in `bg-selection`.

- Groups open with `us-files-label` in sentence case. Rows are `<a class="us-file" aria-selected="true|false">`; only one is selected, and its detail shows in `us-detail`.
- Selected text on `bg-selection` is 3.4:1, kept to match the app's viewer; keep selected rows short.
