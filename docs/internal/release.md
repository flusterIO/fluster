# Release

## Preparing for release

- [ ] `FlusterMake -> nocheck bindings file` to tackle error in generated binding files.
- [ ] `pnpm typecheck` to check typescript errors.
- [ ] `cargo check` to check rust errors

## Release Node Packages

> Make sure you're on the main branch.

1. `git checkout main`
2. `pnpm changeset` to create changeset
3. `make release_npm`.

## Release Tauri app

> Make sure you're on the release branch.

1. `git checkout release` to switch to release branch
2. `git merge main` to merge main branch.
3. `scripts/release_tauri.zsh` or make script `release_tauri`.

### After Build

- Verify the release is not a draft. The release workflow is still generating drafts in some cases for some reason, perhaps when a minor or major bump occurs, but not a patch?

## Revert back to local development

- Change `@fluster.io/dev` dependency to `workspace:*`.
- `pnpm install` to change lock files to using local version.
- `git add --all` & `git commit -m "back to local dev"`
