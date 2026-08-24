# Blog section — hidden on 2026-08-24

The Blog section is **hidden, not deleted**. Every source file is still in the
repository; the section is switched off from `_config.yml`.

---

## How to bring it back

Two edits, both in `_config.yml`.

### 1. Flip the switch

```yaml
# Blog settings
blog_enabled: false      # <-- change to true
```

This is what puts the **Blog** link back into the navigation on the cover panel.

### 2. Let the page be built again

Remove `'blog.html'` from the `exclude` list:

```yaml
exclude: ['README.md', 'screenshot-overview.png', 'blog.html', '0824_hidden_blog.md']
#                                                  ^^^^^^^^^^^ delete this entry
```

Keep `'0824_hidden_blog.md'` in the list — that is this note, and it should never
be published to the live site.

### 3. Rebuild

```
bundle exec jekyll build
```

Then confirm:

- `_site/blog.html` exists
- `_site/index.html` contains a `/blog` link

---

## What was actually changed when hiding it

| File | Change |
| --- | --- |
| `_config.yml` | Added `blog_enabled: false` under `# Blog settings` |
| `_config.yml` | Added `'blog.html'` and `'0824_hidden_blog.md'` to `exclude` |
| `_includes/header.html` | Wrapped the Blog nav item in `{% if site.blog_enabled %} ... {% endif %}` |

Nothing else was touched. No file was deleted.

The two changes do different jobs and **both are needed**:

- `blog_enabled` only controls the navigation link. On its own, `/blog` would
  still be reachable by anyone who typed the URL.
- `exclude` is what actually stops Jekyll from generating the page.

Jekyll front matter cannot read `_config.yml` values, so a single Liquid
condition cannot cover both. Hence the two-line switch.

---

## Files kept in place (untouched, ready to use)

| File | Purpose |
| --- | --- |
| `blog.html` | The blog index page — renders cards from `_data/blogs.yml` |
| `_layouts/blog.html` | Full-page blog layout: header image, nav bar, search box |
| `_data/blogs.yml` | The post list (title, url, image, excerpt, date, comments) |
| `css/main.scss` | `.blog-*` styles, under `/* Blog Page Styles */` |
| `js/main.js` | Search-box toggle, bound to `#searchToggle` |

The blog CSS and JS are still compiled into `_site/css/main.css` and
`_site/js/main.js` even while the section is hidden. That is harmless — a few
unused rules — and it means nothing has to be restored on the asset side.

---

## Before publishing the blog for real

`_data/blogs.yml` currently holds **three placeholder entries** ("Sample Blog
Post 1/2/3") with `url: "#"` and `via.placeholder.com` images. Replace them with
real posts before re-enabling, or the live blog will show dummy cards.

Also note `blog.html` has no `robots: noindex` in its front matter, unlike
`index.html` and `about.html`. If the rest of the site is meant to stay out of
search results, add the same line before publishing:

```yaml
---
layout: blog
title: Blog
robots: noindex
---
```
