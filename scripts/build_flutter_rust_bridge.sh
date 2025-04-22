# Generate grpc dart files
cd "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc" || exit
flutter_rust_bridge_codegen generate

# Generate native root dart files
cd "$FLUSTER_NATIVE_ROOT/packages/fluster_native_interface" || exit
flutter_rust_bridge_codegen generate
