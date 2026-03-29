# Implementation Plan: Redesign Lists on stevehocking.co.uk

## Overview

This plan covers all changes required by `requirements.md`. Each task is self-contained and ordered to minimise conflicts.

---

## Codebase Summary (Current State)

| Item | Value |
|---|---|
| Jekyll version | `~> 4.4` (Gemfile) |
| Plugins | `jekyll-category-pages`, `jekyll-paginate` |
| List pages | `index.html` (home), `_layouts/category_index.html` (per-category) |
| Tile CSS | `.wrap.home > div` — background-image with text overlay |
| Existing breakpoints | 427px, 599px, 749px, 823px, 1239px |

---

## Requirements

| Viewport width | Layout |
|---|---|
| `< 428px` | Tile image **above**, title / tagline / date / categories **below** |
| `< 1024px` | **Single column** — tile image **left**, title / tagline / date / categories **right** |
| `>= 1024px` | **Multiple columns** (same card style as `< 1024px`, maximum 3 columns) |

---

## Task 1 — Update `index.html`

**File:** [`index.html`](../../../index.html)

Replace the existing background-image `<div>` tiles with a structured `<article class="post-tile">` element containing an `<img>` and a content block. Add categories to each tile.

### New tile structure:

```liquid
{% for post in site.posts %}
<article class="post-tile">
  <div class="post-tile-image">
    {% if post.tile-image %}
    <img src="{{ post.tile-image }}" alt="{{ post.title }}">
    {% else %}
    <img src="/assets/tile.jpg" alt="{{ post.title }}">
    {% endif %}
  </div>
  <div class="post-tile-content">
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
    <p class="post-description">{{ post.description }}</p>
    <p class="post-date">{{ post.date | date: "%b %-d, %Y" }}</p>
    {% if post.categories %}
    <div class="post-tile-categories">
      {% for category in post.categories %}
        <a href="{{ site.baseurl }}/categories/{{ category | slugify }}/" class="category-badge">{{ category }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </div>
</article>
{% endfor %}
```

**Acceptance criteria:**
- Each post renders a card with a real `<img>` element (not a background image)
- Title, tagline, date and categories are all visible as text beside or below the image
- Posts without a `tile-image` front-matter value fall back to `/assets/tile.jpg`

---

## Task 2 — Update `_layouts/category_index.html`

**File:** [`_layouts/category_index.html`](../../../_layouts/category_index.html)

Apply the identical tile structure change as Task 1, using `sorted_posts` instead of `site.posts`.

**Acceptance criteria:**
- Category pages render tiles in the same card style as the home page
- Posts are in reverse date order (newest first)

---

## Task 3 — Update `css/main.css`

**File:** [`css/main.css`](../../../css/main.css)

Replace the old `.wrap.home > div` background-image tile styles with new grid and card styles, and add the three responsive breakpoints.

### Rules to replace

Remove or replace:

```css
/* old tile styles — to be replaced */
.wrap.home {
  max-width: none;
  display: flex;
  flex-flow: row wrap;
}

.wrap.home > div { ... }          /* background-image tile */
.wrap.home a, .wrap.home p { ... } /* white text for dark-image overlay */
.wrap.home .invert a, ...          /* dark text for light-image overlay */
.wrap.home a, .wrap.home p { ... } /* duplicated font-weight/padding/text-align */
.wrap.home a.post-link { ... }
.wrap.home p.post-date { ... }
```

### New rules

```css
/* Redesigned list container */
.wrap.home {
  max-width: 1400px;
  padding: 20px 30px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Individual post tile */
.post-tile {
  display: flex;
  flex-direction: row;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

/* Tile image panel */
.post-tile-image {
  flex: 0 0 140px;
  width: 140px;
  overflow: hidden;
}

.post-tile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Tile text panel */
.post-tile-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.post-tile-content .post-link {
  display: block;
  font-size: 1.1em;
  font-weight: 600;
  color: #aa0000;
  margin-bottom: 4px;
}

.post-tile-content .post-description {
  font-size: 0.9em;
  color: #555;
  flex: 1;
  margin-bottom: 4px;
}

.post-tile-content .post-date {
  font-size: 0.75em;
  color: #818181;
  margin-bottom: 6px;
}

.post-tile-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

/* < 1024px: single column, image still left of content */
@media screen and (max-width: 1023px) {
  .wrap.home {
    grid-template-columns: 1fr;
  }
}

/* < 428px: image above, content below */
@media screen and (max-width: 427px) {
  .post-tile {
    flex-direction: column;
  }

  .post-tile-image {
    width: 100%;
    height: 160px;
    flex: none;
  }
}
```

**Acceptance criteria:**
- `>= 1024px` — tiles render in a 3-column grid; each tile has image left and content right
- `< 1024px` — tiles stack in a single column; each tile still has image left and content right
- `< 428px` — tile image is full-width above the content block
- Text is legible on both light and dark backgrounds (no longer overlaid on images)
- Posts without a `tile-image` render correctly with the fallback image

---

## Summary of Files to Create/Edit

| File | Action | Task |
|---|---|---|
| `index.html` | Edit — replace background-image tiles with card structure | Task 1 |
| `_layouts/category_index.html` | Edit — same card structure | Task 2 |
| `css/main.css` | Edit — replace `.wrap.home` tile styles with grid + card CSS | Task 3 |

---

## Implementation Order

```
Task 3 (CSS) should be authored alongside Tasks 1 and 2 so the HTML and CSS
are consistent. All three files can be edited in a single commit.
```

## Verification Steps

After implementation:

1. `bundle exec jekyll build` completes without errors
2. `bundle exec jekyll serve --future` — verify locally at:
   - `375px` width — image stacks above content
   - `768px` width — single column, image left of content
   - `1280px` width — 3-column grid, image left of content in each tile
3. Confirm categories are visible as badge links on every tile that has them
4. Confirm posts without `tile-image` fall back gracefully to `/assets/tile.jpg`
