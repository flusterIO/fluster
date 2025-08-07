cd $FLUSTER_NATIVE_ROOT
pnpm changeset version
make local_deps_to_workspace_version
pnpm install
git add --all
git commit -m "Push to release npm packages"
git push
