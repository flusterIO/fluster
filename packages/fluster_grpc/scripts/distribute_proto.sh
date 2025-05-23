# Change into proper dir
cd "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc" || exit
# Clean the previous build 
sh "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/scripts/clean.sh"
# Generate a new script according to the file structure
"$FLUSTER_NATIVE_ROOT/packages/fluster_internal_workspace/fluster_internal_workspace" generate_grpc_script
# Make sure that script is executable
chmod +x "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/scripts/.proto_build_script.sh"
# Execute that dude...
sh "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/scripts/.proto_build_script.sh"

# Generate flutter bindings
flutter_rust_bridge_codegen generate
