cd $FLUSTER_NATIVE_ROOT
pnpm changeset
pnpm changeset version
make local_deps_to_workspace_version
git add --all
git commit -m "Push to release npm packages"
git push
