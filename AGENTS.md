# Repository Guidelines

## Project Structure & Module Organization
This repository is a Jekyll-based personal site.

- Content pages: root Markdown files such as `index.md`, `about.md`, and `now.md`.
- Blog posts: `_posts/` using `YYYY-MM-DD-title.md` filenames and front matter (`layout`, `title`, `date`).
- Templates: `_layouts/` and shared partials in `_includes/`.
- Static assets: `assets/` (notably `assets/css/input.css`, generated `assets/css/style.css`, and images).
- Site output: `_site/` (generated, not source of truth).
- Utility scripts: `script/start.sh` and `script/build.sh`.

## Build, Test, and Development Commands
- `bundle install`: install Ruby gems from `Gemfile`.
- `bundle exec jekyll serve`: run the site locally with live reload.
- `bundle exec jekyll build`: produce production HTML into `_site/`.
- `npm run css:watch`: rebuild Tailwind CSS from `assets/css/input.css` while editing.
- `npm run css:build`: one-time CSS build for production.
- `./script/start.sh`: convenience wrapper for local Jekyll serve.
- `./script/build.sh`: build site + CSS in one step.

Use two terminals during development: one for `bundle exec jekyll serve`, one for `npm run css:watch`.

## Coding Style & Naming Conventions
- Use Markdown with concise front matter and clear headings.
- Keep post filenames lowercase, hyphen-separated, and date-prefixed (example: `_posts/2026-03-03-example-post.md`).
- Prefer 2-space indentation in HTML/Liquid templates to match existing layout files.
- Keep reusable snippets in `_includes/` and avoid duplicating markup across layouts.

## Testing Guidelines
There is no automated test suite configured yet. Before opening a PR:

1. Run `bundle exec jekyll build` and confirm it completes without errors.
2. Run `npm run css:build` to ensure Tailwind output compiles.
3. Manually verify key pages (`/`, `/about`, and at least one post) in local serve mode.

## Commit & Pull Request Guidelines
Current history favors short, imperative commit messages (for example, `update`, `Create CNAME`). Prefer clearer variants like:

- `content: add post about ...`
- `layout: adjust post header spacing`
- `build: update Tailwind pipeline`

For pull requests, include:

1. A brief summary of changes and affected paths.
2. Any config or build impact (`_config.yml`, CSS pipeline, plugins).
3. Screenshots for visual/layout changes.
4. Linked issue or context when available.
