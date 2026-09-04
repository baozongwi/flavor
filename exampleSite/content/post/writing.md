---
title: "Writing with Flavor"
slug: "writing"
description: "Headings, code, and the table of contents."
date: 2026-09-02
lastmod: 2026-09-02
categories: ["Engineering"]
tags: ["hugo", "markdown"]
---

Posts with more than a couple of headings get a sticky contents rail on wide screens.

## Markdown

Emphasis, lists, and quotes work as usual.

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
```

Relative images are processed as page resources when present, otherwise they follow the post permalink (`/p/:slug/`).
