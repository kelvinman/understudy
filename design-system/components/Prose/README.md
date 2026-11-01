# Prose

Markdown read in place, such as a note or a document opened inside a Split's detail.

- Wrap the rendered markdown in `us-prose`, and each table in `us-prose-table` so it scrolls sideways on a phone.
- Render through one sanitising helper (a markdown parser, then a sanitiser) so nothing in the file can run script.
- Headings stay small: the first is a serif title, the rest are body size at weight 600.
