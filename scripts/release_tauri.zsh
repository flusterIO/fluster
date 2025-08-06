cd $FLUSTER_NATIVE_ROOT
make tauri_version_match
make local_deps_to_remote_version
pnpm install
git add --all
git commit -m "Push release"
git push
echo "Success. Build continuing on Github..."
