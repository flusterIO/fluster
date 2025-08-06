# Release

## Preparing for release

- [ ] `FlusterMake -> nocheck bindings file` to tackle error in generated binding files.
- [ ] `pnpm typecheck` to check typescript errors.
- [ ] `cargo check` to check rust errors

## Release Node Packages

> Make sure you're on the main branch.

- Create a changeset with `pnpm changeset`
- Version all packages with `pnpm changeset version` -- This skips the stage of generating a pull request with the merge and handles everything in one workflow.
- Use Make command to set local package versions to workspace.
- Update lock files with `pnpm install` before versioning to avoid having to convert version back to workspace manually.
- Commit changes, `git add --all` and `git commit ...`
- Git push to run changeset in github action because you're too broke to afford https.

## Release Tauri app

> Make sure you're on the release branch.

- `git checkout release` to switch to release branch
- `git merge main` to merge main branch.
- Use make command to set `tauri.conf.json` version.
- Use make command to set local deps to remote versoin.
- `pnpm install` to update lock files to match the remote version.
- `git add --all` & `git commit -m "Push release"`

### After Build

- Verify the release is not a draft. The release workflow is still generating drafts in some cases for some reason, perhaps when a minor or major bump occurs, but not a patch?

## Revert back to local development

- Change `@fluster.io/dev` dependency to `workspace:*`.
- `pnpm install` to change lock files to using local version.
- `git add --all` & `git commit -m "back to local dev"`
