# AGENTS.md

## Scope

These instructions apply to the entire `abdulbasit742/Angel-dot-` repository. More specific AGENTS.md or AGENTS.override.md files in subdirectories may refine them.

Project: **Angel-dot-**.

Detected root stack: **Documentation or source repository without a supported root package manifest**.

## Working method

1. Read README.md, the relevant manifests, and nearby tests before editing.
2. Check the current diff and preserve unrelated user changes.
3. Make the smallest coherent change that solves the task; follow existing names, patterns, and directory boundaries.
4. Do not hand-edit generated, vendored, dependency, build-output, model-weight, or dataset files unless the task explicitly targets them.
5. Update tests and documentation when behavior, configuration, public APIs, or setup steps change.

## Commands

- Read README.md and inspect nested directories for package.json, pyproject.toml, requirements.txt, Dockerfiles, Makefiles, or service-specific instructions.
- Do not invent build, test, deployment, or migration commands. Record newly verified commands in README.md or a nested AGENTS.md.

## Verification

- Run the narrowest relevant test first, then the repository's available lint, type-check, test, and build commands.
- Never report a check as passed unless it was actually run. State skipped checks and the concrete reason.
- For UI changes, verify loading, empty, error, and success states plus keyboard access and responsive layout.
- For API or persistence changes, verify validation, authorization, failure behavior, and backward compatibility.

## Security and side effects

- Never commit secrets, tokens, passwords, private keys, production data, or populated environment files. Use documented environment variables and sanitized examples.
- Treat migrations, deployments, billing, live network calls, account changes, destructive Git operations, and external messages as side effects. Do not perform them without explicit task authorization.
- Validate untrusted input at trust boundaries and avoid logging credentials, personal data, prompts containing secrets, or raw third-party payloads.
- Preserve existing architecture and external API contracts. Add dependencies or infrastructure only when the requested change clearly requires them.

## Completion checklist

- The requested behavior is implemented with a focused diff.
- Relevant automated checks pass, or any unavailable checks are clearly identified.
- No secrets, generated artifacts, or unrelated formatting churn were introduced.
- The final handoff summarizes changed files, verification evidence, risks, and any follow-up work.
