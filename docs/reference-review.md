# Reference review

Reviewed on 2026-07-15 before the static-site baseline was implemented.

## 1. h5bp/html5-boilerplate

Relevant file: `dist/index.html`.

Adopted:

- explicit UTF-8 and responsive viewport metadata
- page description and Open Graph metadata
- local stylesheet and script files
- SVG favicon, manifest, and theme color

Not adopted:

- the full boilerplate directory structure and tooling, because Angel Dot has only a small static surface.

## 2. actions/starter-workflows

Relevant file: `pages/static.yml`.

Adopted:

- official GitHub Pages configure, artifact upload, and deploy actions
- `contents: read`, `pages: write`, and OIDC permissions at the jobs that require them
- deployment environment URL and Pages concurrency group

Improved for this repository:

- source validation and an explicit build job run before deployment
- only `_site/` is uploaded instead of the entire repository
- build and deploy permissions are separated by job

## 3. w3c/wai-website

Relevant file: `pages/test-evaluate/easy-checks/skip-link.md`.

Adopted:

- a skip link as the first actionable page control
- a real `#main-content` target
- highly visible keyboard focus behavior
- keyboard navigation as a first-class verification target

Additional accessibility baseline:

- semantic landmarks and headings
- reduced-motion handling
- sufficient contrast through design tokens
- large tap targets and responsive layouts

## Result

The final implementation combines production-ready static document defaults, a least-privilege Pages pipeline, and keyboard-first accessibility without adding a framework or runtime dependency.
