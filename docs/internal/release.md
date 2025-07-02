# Release

## Release Node Packages

- Create a changeset with `pnpm changeset`
- Version all packages with `pnpm changeset version`
- Update lock files with `pnpm install`
- Commit changes, `git add --all` and `git commit ...`
- Git push to run changeset in github action because you're too broke to afford https.

## Release Tauri app

- Manually update version of `@fluster.io/dev` to match recently published version to get around issue with pnpm workspace dependencies.
