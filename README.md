# Flavor

Paper-light / blue-dark Hugo theme for technical blogs. CJK serif typography, encrypted posts, friend links, and a travel log.

**Demo:** [baozongwi.xyz](https://baozongwi.xyz)

![Flavor screenshot](https://raw.githubusercontent.com/baozongwi/flavor/main/images/screenshot.png)

Requires **Hugo Extended 0.146+** (developed on 0.163.1).

## Features

- Paper-light and blue-dark color schemes (`prefers-color-scheme` + manual toggle)
- CJK-friendly serif stack; optional self-hosted unicode-range fonts
- Overlay search via [Pagefind](https://pagefind.app/)
- Table of contents, code copy, image lightbox
- AES-256-GCM encrypted posts (browser Web Crypto)
- Friend-link cards and a year-grouped travel list
- Optional welcome splash and homepage typewriter

## Install

```bash
git clone https://github.com/baozongwi/flavor.git themes/flavor
cp themes/flavor/hugo.toml.example hugo.toml
```

Edit the domain, name, and menus in `hugo.toml`, then `hugo server`.

Or as a Hugo module:

```toml
[module]
  [[module.imports]]
    path = "github.com/baozongwi/flavor"
```

Preview the bundled example site from the theme root:

```bash
hugo server --source exampleSite --themesDir ..
```

### Pages

Create these under `content/page/` with the matching `layout`:

| Page | Front matter |
| --- | --- |
| About | `layout: about` |
| Archives | `layout: archives` |
| Friend links | `layout: links` |
| Travel list | `layout: travel` |

Search is a navbar overlay — there is no `/search` page. After `hugo`, run [Pagefind](https://pagefind.app/) on `public/`:

```bash
npx -y pagefind@1.5.0 --site public
```

## Friend links

`data/friends.yaml`. Group names are free-form; `Team` and `Links` render first. Cards shuffle on each refresh.

```yaml
Team:
  - name: su-team
    url: https://su-team.cn/
    avatar: /friends/avatars/su-team.png

Links:
  - name: someone
    url: https://example.com
    avatar: /friends/avatars/someone.jpg
    description: optional
```

Put avatars in `static/friends/avatars/`.

## Encrypted posts

AES-256-GCM + PBKDF2, decrypted in the browser with Web Crypto. Keep plaintext in `content/private/` and **do not commit it**. The repo stores a stub plus `data/encrypted/<slug>.json`.

```bash
echo 'content/private/' >> .gitignore
hugo new --kind encrypted "private/secret-note/secret-note.md"
```

Front matter must include `encrypted: true` and `slug`. Then:

```bash
bash themes/flavor/scripts/encrypt.sh
```

The script prompts for a password. For several posts with the same password: `ENCRYPT_PASSWORD=xxx bash themes/flavor/scripts/encrypt.sh`.

Deploy with a normal `hugo` build — do not set `HUGO_ENCRYPT_PLAIN`. Place images next to the private note; the script copies them to `static/p/<slug>/`.

## Travel

Regular pages with `travel: true`. The travel list groups them by year.

```bash
hugo new --kind travel "page/trips/2026/hangzhou/hangzhou.md"
```

Set `url` to an English path, e.g. `/travel/hangzhou-2026-09/`. Put images in a sibling `assets/` folder:

```markdown
![](assets/001.png)
```

## Welcome / status / typewriter

```toml
[params]
  status = "A line under the name on the homepage"

  [params.welcome]
    enabled = true
    text = "hello"

  [params.typewriter]
    slogans = ["stay hungry, stay foolish"]
```

Leave `welcome.text` empty to skip the splash. `params.status` is the homepage bio line.

## Fonts

The theme **does not ship any font files**. The demo site uses TsangerJinKai 02 (Miaoyan); that typeface is copyrighted and cannot be redistributed with the theme.

If you have unicode-range woff2 files, put them in `static/fonts/` and set:

```toml
[params.font]
  css = "fonts/your-font/result.css"
  preload = "fonts/your-font/xxxx.woff2"
```

Otherwise the stack is `Songti SC / STSong / Noto Serif SC`.

## Images

Body images convert to webp, longest edge 1600, q80. GIF and SVG are left alone.

For large posts, mount originals as Hugo assets (the demo site does this). See `hugo.yaml` `module.mounts` on the demo. Without that mount, images still work as page resources.

## License

MIT.

---

# 中文

纸色浅色 / 蓝黑深色的技术博客主题。CJK 衬线、加密文章、友链、游记。

演示：[baozongwi.xyz](https://baozongwi.xyz)

需要 **Hugo Extended 0.146+**（开发时用的 0.163.1）。

## 安装

```bash
git clone https://github.com/baozongwi/flavor.git themes/flavor
cp themes/flavor/hugo.toml.example hugo.toml
```

改 `hugo.toml` 里的域名、名字、菜单。`hugo server` 能起来就算接上了。

页面用这些 layout（在 `content/page/` 下建对应目录即可）：

| 页面 | front matter |
|---|---|
| 关于 | `layout: about` |
| 归档 | `layout: archives` |
| 友链 | `layout: links` |
| 游记列表 | `layout: travel` |

搜索是顶栏的 overlay，没有单独的 `/search` 页。部署时在 `public/` 上跑一次 [Pagefind](https://pagefind.app/)：

```bash
npx -y pagefind@1.5.0 --site public
```

## 友链

`data/friends.yaml`，分组名随意，`Team` 和 `Links` 会排在最前，组内卡片每次刷新随机顺序。

```yaml
Team:
  - name: su-team
    url: https://su-team.cn/
    avatar: /friends/avatars/su-team.png

Links:
  - name: someone
    url: https://example.com
    avatar: /friends/avatars/someone.jpg
    description: 可选
```

头像放到 `static/friends/avatars/`。

## 加密文章

AES-256-GCM + PBKDF2，浏览器 Web Crypto 解密。明文只放 `content/private/`，**不要提交**；仓库里是 stub + `data/encrypted/<slug>.json`。

```bash
echo 'content/private/' >> .gitignore
hugo new --kind encrypted "private/secret-note/secret-note.md"
```

front matter 里 `encrypted: true` 和 `slug` 必须有。写完：

```bash
bash themes/flavor/scripts/encrypt.sh
```

会提示输入密码。多篇同一密码可以 `ENCRYPT_PASSWORD=xxx bash themes/flavor/scripts/encrypt.sh`。

部署侧照常 `hugo`，不要设 `HUGO_ENCRYPT_PLAIN`。文章图片放到 private 同级目录，脚本会拷到 `static/p/<slug>/`。

## 游记

普通文章，多一个 `travel: true`，列表页按年份收。

```bash
hugo new --kind travel "page/游记/2026/杭州记/杭州记.md"
```

把 `url` 改成英文，例如 `/travel/hangzhou-2026-09/`。图片放同级 `assets/`：

```markdown
![](assets/001.png)
```

## 欢迎页 / 说说 / 打字机

```toml
[params]
  status = "忙碌的生活中"

  [params.welcome]
    enabled = true
    text = "越想越难耐"

  [params.typewriter]
    slogans = ["天地不仁，以万物为刍狗"]
```

`welcome.text` 不填就不显示欢迎页。首页 hero 的那句说说是 `params.status`。

## 字体

主题**不附带**任何字体文件。演示站用的是仓耳今楷 02（妙言），版权归原作者，不能跟着主题分发。

自己有切好的 unicode-range 文件就丢进 `static/fonts/`，再配：

```toml
[params.font]
  css = "fonts/your-font/result.css"
  preload = "fonts/your-font/xxxx.woff2"
```

不配的话走 `Songti SC / STSong / Noto Serif SC`。

## 图片

正文图默认转 webp、最长边 1600、q80。GIF / SVG 不转。

文章和图片很多时，建议把原图挂到 `assets` 再处理（演示站就是这么做的），配置见仓库里博客站点的 `hugo.yaml` `module.mounts`。不配也能用，图会按 Hugo page resource 处理。
