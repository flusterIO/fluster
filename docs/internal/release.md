# Release

> None of this is working yet. These docs are a work in progress, right now just helping me to not forget what I did in case one of them accidentally works.

## Release Node Packages

> Make sure you're on the main branch.

- Create a changeset with `pnpm changeset`
- Version all packages with `pnpm changeset version`
- Update lock files with `pnpm install`
- Commit changes, `git add --all` and `git commit ...`
- Git push to run changeset in github action because you're too broke to afford https.
- If the above step is successful, merge the automatically generated pull request.
  - This should publish the changes to the npm registry, making the tauri build possible without running into pnpm workspace issues.

## Release Tauri app

> Make sure you're on the release branch.

- Manually update version of `@fluster.io/dev` to match recently published version to get around issue with pnpm workspace dependencies.
