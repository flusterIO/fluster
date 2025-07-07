# Release

## Preparing for release

- [ ] `FlusterMake -> nocheck bindings file` to tackle error in generated binding files.
- [ ] `pnpm typecheck` to check typescript errors.
- [ ] `cargo check` to check rust errors

## Release Node Packages

> Make sure you're on the main branch.

- Commit everything on whichever branch you're working on, switch to main and merge latest changes.
- 'FlusterMake -> nocheck bindings' to get around typescript error in generated file.
- Create a changeset with `pnpm changeset`
- Version all packages with `pnpm changeset version` -- This skips the stage of generating a pull request with the merge and handles everything in one workflow.
- Update lock files with `pnpm install`
- Commit changes, `git add --all` and `git commit ...`
- Git push to run changeset in github action because you're too broke to afford https.

## Release Tauri app

> Make sure you're on the release branch.

- `git checkout release` to switch to release branch
- `git merge main` to merge main branch with release branch after pushing packages on main branch.
- Manually update version of `@fluster.io/dev` in `apps/fluster/package.json` to match recently published version to get around issue with pnpm workspace dependencies.
- `pnpm install` to update lock files to match the remote version.
- `git add --all` & `git commit -m "Push release"`

## Revert back to local development

- Change `@fluster.io/dev` dependency to `workspace:*`.
- `pnpm install` to change lock files to using local version.
- `git add --all` & `git commit -m "back to local dev"`
