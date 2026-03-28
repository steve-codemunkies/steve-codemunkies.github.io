# Implementation Plan: Make Categories Visible on stevehocking.co.uk

## Overview

This plan covers all changes required by `requirements.md`. Each task is self-contained and ordered to minimise conflicts. Tasks should be reviewed in sequence; implementation can proceed once the user approves the plan.

---

## Codebase Summary (Current State)

| Item | Value |
|---|---|
| Jekyll version | `~> 4.4` (Gemfile) |
| CSS breakpoints | 600px, 750px, 824px, 1239px |
| Font Awesome | v5.8.1 (loaded in `_includes/head.html`) |
| Plugins | None currently declared |
| Navigation source | `site.pages` filtered by `include: true` front matter |
| Post hero image | Background image on `<header class="post-header post">` in `_layouts/post.html` |

---

## Task 1 — Research Key Display Sizes

**Requirement:** _"Research key display sizes that pages must work in (mobile and desktop)"_

**Findings:**

The site already has four CSS breakpoints, but they don't fully align with the Common Device Viewport Standards used by modern analytics tools (StatCounter, Google Analytics). The target display sizes the implementation should be validated against are:

| Category | Width | Representative device |
|---|---|---|
| Small mobile | 375px | iPhone SE, Galaxy S series |
| Large mobile | 428px | iPhone 14 Pro Max |
| Tablet | 768px | iPad portrait |
| Small laptop | 1024px | iPad landscape / small laptop |
| Standard desktop | 1280px | Most laptop/desktop |
| Wide desktop | 1440px | Standard widescreen monitor |

**Existing breakpoints mapped to these:**

| Existing breakpoint | Purpose |
|---|---|
| `≤ 600px` | Mobile nav collapses, padding shrinks, font sizes reduce |
| `≤ 750px` | Footer column re-flow |
| `≤ 824px` | Images set to 100% width, photo credit stacks |
| `≤ 1239px` | Sidebar image hidden |

**Action required:** New CSS added in later tasks must be tested at 375px, 768px, 1024px, and 1280px as a minimum. No new breakpoints are _required_ unless the new elements break at existing breakpoints (see individual tasks).

---

## Task 2 — Make Post Title Bolder

**Requirement:** _"Make the post title a little bolder"_

**File:** [`css/main.css`](../../../css/main.css)

**Current rule (line ~283):**
```css
.post-header h1 {
  font-size: 42px;
  letter-spacing: -1.75px;
  line-height: 1;
  font-weight: 300;
}
```

**Change:** Increase `font-weight` from `300` (light) to `500` (medium). This is a subtle improvement — going to `bold` (700) would be too heavy against the hero image background.

```css
.post-header h1 {
  font-size: 42px;
  letter-spacing: -1.75px;
  line-height: 1;
  font-weight: 500;
}
```

**Also update the `@media screen and (max-width: 600px)` rule** which doesn't set font-weight, so no change needed there — it inherits from the rule above.

**Acceptance criteria:**
- Post page title is visibly heavier than before without becoming harsh/jarring
- Title remains readable over both light and dark hero images

---

## Task 3 — Move Post Tagline and Date Off the Hero Image

**Requirement:** _"Move post tagline and date off the hero image"_

**Files:** [`_layouts/post.html`](../../../_layouts/post.html) and [`css/main.css`](../../../css/main.css)

### Current structure of `_layouts/post.html`:
```html
<header class="post-header post" style="background-image: url('...');">
  <div class="wrap">
    <h1>{{ page.title }}</h1>
    <h2>{{ page.description }}</h2>
    <p class="meta">{{ page.date | date: "%b %-d, %Y" }}...</p>
  </div>
</header>

<div class="wrap post">
  <article class="post-content">
    {{ content }}
  </article>
</div>
```

### New structure — move `<h2>` and `<p class="meta">` below the header:
```html
{% if page.hero-image and page.invert-header %}
<header class="post-header invert" style="background-image: url('{{ page.hero-image }}');">
{% elsif page.hero-image %}
<header class="post-header post" style="background-image: url('{{ page.hero-image }}');">
{% else %}
<header class="post-header post" style="background-image: url('/assets/blog-banner.jpg');">
{% endif %}
  <div class="wrap">
    <h1>{{ page.title }}</h1>
  </div>
</header>

<div class="wrap post">

  <div class="post-meta-block">
    <p class="post-tagline">{{ page.description }}</p>
    <p class="meta">{{ page.date | date: "%b %-d, %Y" }}{% if page.author %} • {{ page.author }}{% endif %}{% if page.meta %} • {{ page.meta }}{% endif %}</p>
  </div>

  <article class="post-content">
    {{ content }}
  </article>

</div>
```

> **Note:** The `<h2>` is renamed to `<p class="post-tagline">` to avoid it being rendered as a heading-level anchor target by screen readers when outside the header landmark. A `<p>` styled to look like an h2 is more appropriate here.

### CSS additions needed in `css/main.css`:
```css
/* Post meta block (tagline + date, below hero) */
.post-meta-block {
  padding: 20px 0 10px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
}

.post-meta-block .post-tagline {
  font-size: 21px;
  letter-spacing: -0.5px;
  line-height: 1.3;
  font-weight: 300;
  color: #555;
  margin-bottom: 6px;
}

.post-meta-block .meta {
  font-size: 15px;
  color: #828282;
}
```

### CSS removals/changes needed:
The existing `.post-header h2` and `.post-header .meta` rules targeted those elements inside the hero. They can be kept for any other context but are no longer relevant to the post layout. No deletion required unless they cause visual regressions.

**Acceptance criteria:**
- Hero image is uncluttered — only the `<h1>` title appears over it
- Tagline and date appear cleanly below the hero in the white body area
- Both elements remain readable on mobile (375px) and desktop (1280px)

---

## Task 4 — Add `jekyll-category-pages` Plugin ✅

**Requirement:** _"Add `jekyll-category-pages` Plugin"_

**References from `copilot-chat.md`:** [jekyll-category-pages](https://github.com/field-theory/jekyll-category-pages)

This plugin auto-generates one page per category using a specified layout. It reads `site.categories` (already populated by Jekyll from post front matter) and emits pages at configurable URLs.

### 4a — Update `Gemfile`

**File:** [`Gemfile`](../../../Gemfile)

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "jekyll-category-pages"
```

### 4b — Update `_config.yml`

**File:** [`_config.yml`](../../../_config.yml)

Add at the end:
```yaml
plugins:
  - jekyll-category-pages

category_layout: "category_index.html"
category_path: "categories"
```

- `category_layout` tells the plugin which layout file in `_layouts/` to use for each generated category page.
- `category_path` sets the URL prefix (default is `categories`, yielding `/categories/:category-name/`).

### 4c — Run `bundle install`

After editing the Gemfile, run:
```bash
bundle install
```

This will update `Gemfile.lock` with the new gem.

**Acceptance criteria:**
- `bundle exec jekyll build` succeeds with no plugin errors
- Category pages are generated under `_site/categories/` for every category found in post front matter

---

## Task 5 — Create the Category Index Layout ✅

**Requirement:** _"For each category list the posts in reverse date order, reuse the formatting from the main page"_

**File to create:** [`_layouts/category_index.html`](../../../_layouts/category_index.html)

The `jekyll-category-pages` plugin passes the following variables to this layout:
- `page.title` — the category name (capitalised)
- `page.posts` — array of posts in this category (in Jekyll's default order)

The tile format from `index.html` must be reused. Posts should be listed in reverse chronological order (most recent first).

```html
---
layout: default
---
<header class="post-header post" style="background-image: url('/assets/blog-banner.jpg');">
  <div class="wrap">
    <h1>{{ page.title }}</h1>
  </div>
</header>

<div class="wrap home">

  {% assign sorted_posts = page.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
    {% if post.tile-image and post.invert-header %}
  <div class="invert" style="background-image: url('{{ post.tile-image }}');">
    {% elsif post.tile-image %}
  <div style="background-image: url('{{ post.tile-image }}');">
    {% else %}
  <div>
    {% endif %}
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    <p class="post-description">{{ post.description }}</p>
    <p class="post-date">{{ post.date | date: "%b %-d, %Y" }}</p>
  </div>
  {% endfor %}

</div>

<div class="subscribe-footer">
  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
</div>
```

**Acceptance criteria:**
- Each category URL (e.g. `/categories/docker/`) renders a page with the hero banner and tile grid
- Tiles exactly match the visual style of the home page
- Posts are in reverse date order (newest first)

---

## Task 6 — Create the Categories Index Page

**Requirement:** _"Add a page listing categories, this will live at `/categories/`, style the same as main and about pages"_

**File to create:** [`categories/index.html`](../../../categories/index.html)

This page lists all categories alphabetically with a post count, and links to each category page. To appear in the navigation, `include: true` must be set in the front matter (matching the pattern used by `about.md` and `work-history.md`).

```html
---
layout: default
title: Categories
description: "Browse posts by category"
permalink: /categories/
include: true
---
<header class="post-header post" style="background-image: url('/assets/blog-banner.jpg');">
  <div class="wrap">
    <h1>Categories</h1>
  </div>
</header>

<div class="wrap post">
  <article class="post-content">
    <ul class="category-list">
      {% assign categories_list = site.categories | sort %}
      {% for category in categories_list %}
        <li>
          <a href="{{ site.baseurl }}/categories/{{ category[0] | slugify }}/">
            {{ category[0] }}
          </a>
          <span class="category-count">({{ category[1].size }})</span>
        </li>
      {% endfor %}
    </ul>
  </article>
</div>
```

### CSS additions needed in `css/main.css`:
```css
/* Categories index page */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 8px 0;
  border-bottom: 1px solid #e8e8e8;
  font-size: 18px;
}

.category-list li:last-child {
  border-bottom: none;
}

.category-count {
  font-size: 14px;
  color: #828282;
  margin-left: 6px;
}
```

**Acceptance criteria:**
- `/categories/` is accessible and renders without errors
- All categories from post front matter appear in the list, sorted alphabetically
- Each category name links to its generated category page
- "Categories" appears in the site navigation header

---

## Task 7 — Display Categories on the Post Page

**Requirement:** _"On the post page provide three options for displaying categories beneath the tag line and date, the category should link to the category page"_

Three styling options are described below. **Select one before implementation begins.** All options insert content into `_layouts/post.html` immediately after the `.post-meta-block` div added in Task 3, and all require the same Liquid logic — only the markup and CSS differ.

### Common Liquid snippet (identical in all options):
```liquid
{% if page.categories %}
  <!-- [option-specific markup here] -->
{% endif %}
```

---

### Option A — Inline text list (minimal, typographic)

Best if: you want categories to feel like editorial metadata.

**HTML:**
```html
{% if page.categories %}
<p class="post-categories">
  Filed under:
  {% for category in page.categories %}
    <a href="{{ site.baseurl }}/categories/{{ category | slugify }}/">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
  {% endfor %}
</p>
{% endif %}
```

**CSS:**
```css
.post-categories {
  font-size: 14px;
  color: #828282;
  margin-bottom: 20px;
}
```

**Preview:** `Filed under: docker, azure, cloudfront-function`

---

### Option B — Pill/badge tags (visual, scan-friendly)

Best if: you want categories to feel clickable and visually distinct.

**HTML:**
```html
{% if page.categories %}
<div class="post-categories">
  {% for category in page.categories %}
    <a href="{{ site.baseurl }}/categories/{{ category | slugify }}/" class="category-badge">{{ category }}</a>
  {% endfor %}
</div>
{% endif %}
```

**CSS:**
```css
.post-categories {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.category-badge {
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid #aa0000;
  border-radius: 12px;
  font-size: 13px;
  color: #aa0000;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.category-badge:hover {
  background-color: #aa0000;
  color: #fff;
  text-decoration: none;
}
```

**Preview:** `[docker]  [azure]  [cloudfront-function]` (styled as rounded bordered tags)

---

### Option C — Icon + dot-separated list (structured, icon-led)

Best if: you want categories to feel like metadata with clear visual hierarchy. Uses Font Awesome 5 (already loaded).

**HTML:**
```html
{% if page.categories %}
<p class="post-categories">
  <i class="fas fa-tags" aria-hidden="true"></i>
  {% for category in page.categories %}
    <a href="{{ site.baseurl }}/categories/{{ category | slugify }}/">{{ category }}</a>{% unless forloop.last %} &middot; {% endunless %}
  {% endfor %}
</p>
{% endif %}
```

**CSS:**
```css
.post-categories {
  font-size: 14px;
  color: #828282;
  margin-bottom: 20px;
}

.post-categories .fa-tags {
  margin-right: 6px;
  color: #c2c2c2;
}
```

**Preview:** `🏷 docker · azure · cloudfront-function`

---

> **Decision:** Option B (Pill/badge tags) has been selected for implementation.

---

## Summary of Files to Create/Edit

| File | Action | Task |
|---|---|---|
| `css/main.css` | Edit — increase `font-weight` of `.post-header h1` | Task 2 |
| `_layouts/post.html` | Edit — move `<h2>` and `.meta` below `</header>` | Task 3 |
| `css/main.css` | Edit — add `.post-meta-block` rules | Task 3 |
| `Gemfile` | Edit — add `jekyll-category-pages` gem | Task 4 |
| `_config.yml` | Edit — add `plugins` and `category_layout` | Task 4 |
| `_layouts/category_index.html` | **Create** — layout for auto-generated category pages | Task 5 |
| `categories/index.html` | **Create** — categories listing page | Task 6 |
| `css/main.css` | Edit — add `.category-list` rules | Task 6 |
| `_layouts/post.html` | Edit — add category display snippet | Task 7 |
| `css/main.css` | Edit — add `.post-categories` rules | Task 7 |

---

## Implementation Order

```
Task 4 (plugin setup)
  → Task 5 (category_index layout — needed by plugin)
  → Task 6 (categories index page)
  → Task 2 (title boldness — independent CSS change)
  → Task 3 (move tagline/date — layout + CSS)
  → Task 7 (category display on post — depends on Task 3 structure and Task 4 URLs)
```

## Verification Steps

After all tasks are implemented:

1. `bundle exec jekyll build` completes without errors
2. `bundle exec jekyll serve -D --future` — verify locally:
   - Home page tiles are unchanged in appearance
   - A post page: title is bolder; tagline and date appear below the hero image; categories are shown beneath them
   - `/categories/` lists all categories alphabetically with post counts
   - `/categories/docker/` (or any category) shows a tile grid of posts in reverse date order
   - "Categories" appears in the site nav header
3. Manually test at 375px and 1280px viewport widths for the post page and categories pages
