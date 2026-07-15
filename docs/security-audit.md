# Changed-area security audit

## Fixed

- **Repository exposure in Pages artifact:** the old workflow uploaded `.`. The new build copies only six public files/directories into `_site/` and deploys that directory.
- **No pre-deployment validation:** CI and Pages now run the same dependency-free source and artifact checks.
- **Unrestricted page resources:** the page loads only local assets and includes a restrictive HTML Content Security Policy.
- **No secret/file guard:** validation rejects private-key-like extensions and unexpectedly large files in the checked tree.
- **Missing trust signals:** metadata, referrer policy, no remote resources, and an honest project-scope statement are now explicit.

## Privacy posture

The page sends no analytics, tracking pixels, forms, API calls, or third-party asset requests. The theme preference uses local storage only and falls back safely when storage is unavailable.

## Residual risks

- A CSP delivered by an HTTP response header is stronger than a CSP meta element. GitHub Pages does not provide per-project response-header configuration, so the meta policy is defense in depth rather than a complete header policy.
- GitHub Actions are pinned to version tags rather than immutable commit SHAs. Major-version tags keep maintenance manageable but carry more supply-chain risk than full SHA pins.
- Automated checks are targeted static checks, not a browser accessibility audit. Manual keyboard, screen-reader, responsive, and contrast review remains valuable after major visual changes.
- The repository name and project purpose remain underspecified. Future copy must be updated when the intended scope is known.
