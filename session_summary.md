# Session Summary — 2026-03-25

## Changes Made

### CLAUDE.md (created)
- Documents build commands (`bundle install`, `bundle exec jekyll serve`, `bundle exec jekyll build`)
- Describes site architecture: `_config.yml`, `_projects/` collection, `_layouts/`, `pages/`, `assets/main.scss`, climate-hexmaps standalone tool
- Documents front matter fields for projects and nav pages, key CSS classes, and content patterns for adding members/projects

### pages/people.md
- **Zhiyi Jiang**: Removed from PhD Students table; added to Former Members as `_now at Yangzhou Polytechnic University, Yangzhou, Jiangsu, China_`
- **Dr Charles Williams**: Added to Staff with ORCID (`https://orcid.org/0000-0003-1791-2463`), website, UCL email, role "Senior Research Fellow in Climate Science"
- **Harry Grosvenor**: Added to PhD Students at Queen Mary, University of London (since Mar-2024), ORCID (`https://orcid.org/0009-0008-0177-4338`), topic "Indian Ocean climate, especially of the Pliocene"
- **Twitter links removed**: Removed all Twitter profile links for Alice Carter-Champion, Chris Brierley, Harry Heorton, Tom Keel, and Daniel Parkes

### _config.yml
- Removed `twitter:` card config block
- Added `CLAUDE.md` to `exclude:` list (fixes GitHub Pages build failure caused by `jekyll-optional-front-matter` plugin processing CLAUDE.md)

### climate-hexmaps/index.html and climate-hexmaps/original/index.html
- Replaced Twitter Card meta tags with plain Open Graph equivalents (`og:url`, `og:title`, `og:description`, `og:image`)

## Commits
1. `e582718` — Initial people/projects updates (Zhiyi, Charles Williams, Harry Grosvenor)
2. Twitter removal commit
3. `7501d24` — Added CLAUDE.md to Jekyll exclude list (build fix)

## Issues Encountered
- **GitHub Pages build failure**: `jekyll-optional-front-matter` plugin (bundled in `github-pages` gem) attempted to process CLAUDE.md as a Jekyll page. Fixed by adding it to `exclude:` in `_config.yml`.
- **Harry Grosvenor's institution**: Initially added with UCL profile; corrected to Queen Mary, University of London per user clarification.
