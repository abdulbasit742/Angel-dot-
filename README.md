# Angel Dot

Angel Dot is a dependency-free static site foundation for GitHub Pages. It intentionally avoids inventing a product scope that the repository has not documented; the page describes the project as it exists today and provides a clean base for future content.

## What is included

- semantic, responsive HTML with a skip link and visible keyboard focus
- light, dark, and system theme behavior using local JavaScript only
- no analytics, remote fonts, remote scripts, forms, cookies, or third-party requests
- a restrictive HTML Content Security Policy
- a custom 404 page, SVG icon, and web manifest
- dependency-free source validation and an allowlisted build artifact
- CI and a build-before-deploy GitHub Pages workflow

## Local verification

Node.js 20 or newer is required. There are no package dependencies.

```bash
npm install --ignore-scripts --no-audit --no-fund
npm test
```

`npm test` validates the source, builds `_site/`, validates the built artifact, and fails on broken local assets, missing accessibility/security requirements, unsafe URL schemes, remote assets, duplicate IDs, large unexpected files, or private-key-like files.

To preview the built artifact with Python:

```bash
python -m http.server 8000 --directory _site
```

Then open `http://localhost:8000`.

## Deployment boundary

GitHub Pages receives only these built files:

- `index.html`
- `404.html`
- `icon.svg`
- `site.webmanifest`
- `assets/styles.css`
- `assets/app.js`

Repository documentation, workflows, issue templates, and agent instructions are not included in the Pages artifact.

## Customizing the project

Update the content in `index.html`, visual design in `assets/styles.css`, and progressive enhancement in `assets/app.js`. When the real purpose of Angel Dot is defined, replace the intentionally generic copy with accurate product or project information and keep the checks aligned with any new local assets.
