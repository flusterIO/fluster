# Release

## Preparing for release

- [ ] `FlusterMake -> nocheck bindings file` to tackle error in generated binding files.
- [ ] `pnpm typecheck` to check typescript errors.
- [ ] `cargo check` to check rust errors

## Release Node Packages

> Make sure you're on the main branch.

1. Create a changeset with `pnpm changeset`
2. Version all packages with `pnpm changeset version` -- This skips the stage of generating a pull request with the merge and handles everything in one workflow.
3. Use Make command to set local package versions to workspace.
4. Update lock files with `pnpm install` before versioning to avoid having to convert version back to workspace manually.
5. Commit changes, `git add --all` and `git commit ...`
6. Git push to run changeset in github action because you're too broke to afford https.

## Release Tauri app

> Make sure you're on the release branch.

1. `git checkout release` to switch to release branch
2. `git merge main` to merge main branch.
3. Use make command to set `tauri.conf.json` version.
4. Use make command to set local deps to remote versoin.
5. `pnpm install` to update lock files to match the remote version.
6. `git add --all` & `git commit -m "Push release"`

### After Build

- Verify the release is not a draft. The release workflow is still generating drafts in some cases for some reason, perhaps when a minor or major bump occurs, but not a patch?

## Revert back to local development

- Change `@fluster.io/dev` dependency to `workspace:*`.
- `pnpm install` to change lock files to using local version.
- `git add --all` & `git commit -m "back to local dev"`
