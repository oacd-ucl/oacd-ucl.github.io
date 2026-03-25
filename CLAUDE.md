# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Site

This is the website for the Ocean, Atmosphere and Cryospheric Dynamics (OACD) research group at UCL. It is a Jekyll static site hosted on GitHub Pages at https://oacd-ucl.github.io.

## Build and Serve Commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

The site uses the `minima` theme with `github-pages` gem for GitHub Pages compatibility.

## Site Architecture

**Configuration:** `_config.yml` defines the site title, navigation pages (`header_pages`), and a `projects` collection that auto-generates pages from `_projects/`.

**Collections:** `_projects/` contains numbered Markdown files (e.g. `01-exceptional-C20-NE-Atlantic.md`) with front matter fields: `number`, `title`, `peeps` (group members), `collaborators`, `github`, and `video_url`. These are rendered using `_layouts/project.html`.

**Navigation pages:** `pages/` contains the five main nav pages: `projects.md`, `people.md`, `resources.md`, `teaching.md`, and `other.md`. Each uses front matter fields `menu_title` and `menu_icon` (Bootstrap Icons name).

**Layouts:**
- `default.html` — base layout with header, breadcrumbs, footer
- `project.html` — extends default; renders project metadata sidebar (group members, collaborators, GitHub link) and optional video thumbnail
- `project_list.html` — lists all projects from the `_projects` collection
- `notebook.html` / `resource.html` — for embedding Jupyter notebooks and resource pages

**Styling:** `assets/main.scss` imports the `minima` theme then adds custom styles. Key CSS classes: `.team-list` (people tables), `.lead` (highlighted list sections), `.aside` (floating sidebar panels), `.btn` (call-to-action buttons), `.grid` (2-column project/resource grid), `.alt-table` (alternating-row tables), `.embedded` (hides chrome when iframed). Bootstrap Icons (v1.3.0) are loaded via CDN.

**People page** (`pages/people.md`): Uses raw HTML `<table class="team-list">` with `{% link %}` tags for local photos from `assets/team/`. Placeholder images use `https://avatars.githubusercontent.com/u/0?s=120&v=4`.

**Climate Hexmaps:** `climate-hexmaps/` is a standalone D3.js-based interactive hexmap tool (not Jekyll-processed) showing UK constituency climate data. It has its own `index.html`, data CSVs, and JavaScript libraries.

## Adding Content

**New project:** Add a numbered `.md` file to `_projects/` following existing front matter conventions. The `peeps` list should match names in `pages/people.md`.

**New team member:** Add an HTML `<tr>` block to `pages/people.md` following the existing pattern. Add a photo to `assets/team/` if available, otherwise use the GitHub placeholder URL.
