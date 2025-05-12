mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc"
mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/generated/grpc"
mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc"

protoc \
    --proto_path="$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src" \
    --python_out="$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc" \
    --rust_out=$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/generated experimental-codegen=enabled \
    --go_opt=Mprotos/database.proto=fluster_grpc/database \
    --rust_out=$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/generated experimental-codegen=enabled \
    --go_opt=Mprotos/mdx.proto=fluster_grpc/mdx \
    --rust_out=$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/generated experimental-codegen=enabled \
    --go_opt=Mprotos/settings.proto=fluster_grpc/settings \
    --go_out="$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/generated/grpc" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/database.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/mdx.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/settings.proto"

# This needs to be handled seperately because of the plugin.
protoc \
    --proto_path="$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src" \
    --plugin="protoc-gen-ts=$FLUSTER_NATIVE_ROOT/packages/fluster_ts/node_modules/.bin/protoc-gen-ts" \
    --ts_opt=esModuleInterop=true \
    --ts_out="$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/database.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/mdx.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/src/proto/settings.proto"
