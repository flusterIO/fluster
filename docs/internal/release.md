# Release

## Preparing for release

- [ ] `FlusterMake -> nocheck bindings file` to tackle error in generated binding files.
- [ ] `pnpm typecheck` to check typescript errors.
- [ ] `cargo check` to check rust errors

## Release Node Packages

> Make sure you're on the main branch.

1. `git checkout main`
1. `git merge dev`
1. `pnpm changeset` to create changeset
1. `make release_npm`.
   - This will run a Github action. Make sure to wait for that to complete before running following script to release build the Tauri application on Github.

## Release Tauri app

> Make sure you're on the release branch.

1. `git checkout release` to switch to release branch
2. `git merge main` to merge main branch.
3. `scripts/release_tauri.zsh` or make script `release_tauri`.

### After Build

- Verify the release is not a draft. The release workflow is still generating drafts in some cases for some reason, perhaps when a minor or major bump occurs, but not a patch?

## Revert back to local development

- `git checkout dev`
- `git merge release`
- `make post_release_revert` to revert local dependencies back to workspace versions
