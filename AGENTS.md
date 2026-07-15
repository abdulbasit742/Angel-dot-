# AGENTS.md

## Scope

These instructions apply to the entire `abdulbasit742/Angel-dot-` repository.

Project: **Angel Dot**, a dependency-free static GitHub Pages site.

## Architecture

- `index.html`: public landing page and semantic content
- `404.html`: public missing-page response
- `assets/styles.css`: all site styles
- `assets/app.js`: optional progressive enhancement only
- `icon.svg` and `site.webmanifest`: local identity/PWA metadata
- `scripts/check-site.mjs`: source and artifact validation
- `scripts/build-site.mjs`: allowlisted `_site/` build
- `.github/workflows/ci.yml`: verification
- `.github/workflows/static.yml`: verified Pages deployment

## Commands

Use Node.js 20 or newer.

- install metadata: `npm install --ignore-scripts --no-audit --no-fund`
- full verification: `npm test`
- source check: `npm run check`
- build: `npm run build`
- preview: `python -m http.server 8000 --directory _site`

## Working rules

1. Keep runtime and build dependencies at zero unless a concrete requirement justifies one.
2. Do not add remote scripts, styles, fonts, images, analytics, trackers, forms, or API calls without documenting the new trust boundary.
3. Preserve the skip link, semantic landmarks, keyboard focus, reduced-motion behavior, and responsive layout.
4. Keep all public assets inside the build allowlist. Update `scripts/build-site.mjs`, tests, README, and workflow artifact assertions together when adding an asset.
5. Never deploy the repository root; deploy `_site/` only.
6. Never commit secrets, credentials, private keys, personal data, or generated `_site/` output.
7. Keep project claims honest. Do not invent features, customers, integrations, or business scope.

## Completion checklist

- `npm test` passes.
- All local references resolve in source and `_site/`.
- The Pages artifact contains only intended public files.
- Keyboard focus, skip navigation, light/dark themes, reduced motion, and mobile layout remain usable.
- Documentation reflects any changed public behavior or deployment contract.
