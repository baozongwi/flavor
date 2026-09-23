---
title: "Writing with Flavor"
slug: "writing"
description: "Headings, code, links, and the table of contents."
date: 2026-09-02
lastmod: 2026-09-02
categories: ["Engineering"]
tags: ["hugo", "markdown"]
---

Posts with headings get a contents button on the right. It stays closed until you open it; the sheet slides in from the edge. A back-to-top control appears after you scroll.

# Body-level heading

Some posts only use `#` in the body. Flavor's TOC starts at level 1 so those still get a directory.

## Markdown

Emphasis, lists, and quotes work as usual. External links such as [Hugo](https://gohugo.io/) pick up a small arrow; same-site links do not.

- Keep front matter `slug` in sync with `permalinks.post`
- Put page resources next to the markdown file
- GIF and SVG skip the webp pipeline

> The theme ships no webfonts. Point `params.font` at your own files, or keep the system Songti / Noto serif stack.

## Code

```go
package main

import "fmt"

func main() {
    fmt.Println("hello, flavor")
}
```

Fenced blocks use Chroma class highlighting. Light and dark palettes live in `assets/scss/chroma-*.css`.

## Images

```markdown
![](assets/001.png)
![narrow|320](assets/001.png)
```

Relative images are processed as page resources when present, otherwise they follow the post permalink (`/p/:slug/`). Images wider than the column get an 850w srcset. Obsidian `![alt|320]` (or `?w=320`) sets a smaller display width.

## Tags

The title comes first. Tags in the meta line under it are plain `#name` links. The `/tags/` index is equal-size wrapping text, not a weighted cloud.

## Long enough to scroll

The back-to-top button is only on article pages, and only after the page has moved more than about 320 pixels. Home, About, archives, and tags never render it.

Keep reading past the fold so the control can show up in the corner, stacked under the contents button.

The directory stays open when you click a heading. Close it with the X or Escape. Between 768px and 1473px the article shifts left so the sheet sits in the margin; wider windows stay centered; on a phone the sheet overlays the text.
