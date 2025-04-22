trash "$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc/"
trash "$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/grpc/"
trash "$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc/"
trash "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/frb_generated.rs"
trash "$FLUSTER_NATIVE_ROOT/packages/fluster_native_interface/rust/src/frb_generated.rs"
touch "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/frb_generated.rs"
touch "$FLUSTER_NATIVE_ROOT/packages/fluster_native_interface/rust/src/frb_generated.rs"
mkdir "$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc/"
mkdir "$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/grpc/"
mkdir "$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc/"



trash $FLUSTER_NATIVE_ROOT/packages/fluster_grpc/lib/src/rust/
mkdir $FLUSTER_NATIVE_ROOT/packages/fluster_grpc/lib/src/rust/
trash $FLUSTER_NATIVE_ROOT/packages/fluster_native_interface/lib/src/rust/
mkdir $FLUSTER_NATIVE_ROOT/packages/fluster_native_interface/lib/src/rust/
