# Chen Hongshan's Personal Website

Personal portfolio site for Chen Hongshan, built with Jekyll and hosted at
<https://chenhongshan333.github.io/>.

## About

I am a Year 3 Computer Science undergraduate at the National University of
Singapore, minoring in Interactive Media, and a holder of the NUS Science and
Technology Undergraduate Scholarship (2024–2028).

My work runs along two tracks: **evaluation and retrieval** (LLM agent
benchmarks, metric design, RAG and vector search) and **graphics and vision**
(real-time rendering, mesh processing, synthetic data in Unreal Engine 5).

## Pages

| Page | Source | Notes |
| --- | --- | --- |
| Home | `index.html` + `_data/projects.yml` | Project timeline with domain filters |
| About | `about.html` | Hand-written; the long-form version of the CV |
| Blog | `blog.html` | **Currently hidden** — see [`0824_hidden_blog.md`](0824_hidden_blog.md) |

Both `index.html` and `about.html` carry `robots: noindex`, so the site is
reachable by link but is not indexed by search engines.

## Features

- Filterable project timeline (AI/ML · Computer Graphics · Software Engineering · UX/UI Design)
- About page with collapsible experience, project, and course sections
- Section progress rail on the About page that tracks scroll position
- Résumé download in Chinese and English
- Click-to-copy email addresses with a confirmation toast
- Social links (LinkedIn, GitHub)

## Projects featured

| Project | Tags | Tech |
| --- | --- | --- |
| LLM Travel-Agent Evaluation System *(Trip.com internship)* | AI/ML | Python, async pipelines, Playwright, LLM APIs |
| Long-Horizon Benchmark for Video World Models *(NUS Odyssey)* | AI/ML, Computer Graphics | Unreal Engine 5, Python |
| NetEase Cloud Music Support Agent | AI/ML, Software Engineering | Java, Spring Boot, RAG, Redis, Docker |
| Harmonia — Multimodal Hybrid Review Validation | AI/ML | Python, FastBERT, CLIP, FAISS, Qwen, vLLM |
| Grid Adventure Agent | AI/ML | Python, PyTorch, A\* search |
| HomeRun — Co-living Mediator Dashboard | UX/UI Design | Figma, Miro |
| PropBank — MarketPlace Service | UX/UI Design | Figma, Next.js, TypeScript |
| Fleet Dashboard | UX/UI Design | React, Vite |
| Mintty — Task Manager | Software Engineering | Java 17, JavaFX |
| CatPals — Volunteer Operations App | Software Engineering | Java 17, JavaFX, Git |
| OpenGL Graphics Coursework | Computer Graphics | C++, OpenGL, FreeGLUT |
| 3D Modelling and Animation Coursework | Computer Graphics | C++, OpenGL, Blender |

## Where to edit what

| I want to change… | Edit |
| --- | --- |
| A project card on the home page | `_data/projects.yml` |
| The filter buttons | `index.html` (must match the `tags:` values) |
| Anything on the About page | `about.html` |
| Name, emails, social handles, site URL | `_config.yml` |
| Cover photo, background, tagline | `_config.yml` + `_includes/header.html` |
| Résumé PDFs | `assets/resume/` |
| Styling | `css/main.scss` (site-specific) or `_sass/` (theme) |
| Behaviour (filters, dropdowns, progress rail) | `js/main.js` |

### Adding a project

Append an entry to `_data/projects.yml`:

```yaml
- name: Project Name
  gh_user: ChenHongshan333
  repo: repo-name
  url: https://example.com        # optional; falls back to the GitHub repo
  desc: "One or two sentences."
  img: /images/thumbnail.png
  tags: [AI/ML, Software Engineering]
```

Two optional keys support entries that are not public repositories:

- `no_gh: true` — hides the GitHub star/fork/watcher row (used for the Trip.com
  and NUS Odyssey entries, which have no public repo)
- `meta:` — a small line under the title, for a role and date range

The filter buttons in `index.html` are matched against `tags` as substrings, so
no tag may be a substring of another.

## Local development

Requires Ruby and Bundler. Built with Ruby 3.4 and Jekyll 4.4.

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

> **Do not use VS Code Live Server.** It serves the raw source files without
> processing Jekyll's Liquid templates, so the site will render incorrectly.

Note that `.svg` files must be served as `image/svg+xml`. Some minimal static
servers (including `python -m http.server` on Windows) send `image/svg`, which
browsers refuse to render inside `<img>`; `jekyll serve` and GitHub Pages both
send the correct type.

## Stack

- Jekyll 4.4 (static site generator) with Liquid templating
- Sass, compiled from `_sass/` and `css/main.scss`
- jQuery 3.6 for the filters, dropdowns, and progress rail
- Font Awesome icons
