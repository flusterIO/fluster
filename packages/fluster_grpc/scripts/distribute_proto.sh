mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc"
mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/generated/grpc"
mkdir -p "$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc"

protoc \
    --proto_path="$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src" \
    --python_out="$FLUSTER_NATIVE_ROOT/packages/fluster_py/fluster_py/generated/grpc" \
    --go_opt=Mprotos/database.proto=fluster_grpc/database \
    --go_opt=Mprotos/mdx.proto=fluster_grpc/mdx \
    --go_opt=Mprotos/settings.proto=fluster_grpc/settings \
    --go_out="$FLUSTER_NATIVE_ROOT/packages/fluster_go/pkg/generated/grpc" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/database.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/mdx.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/settings.proto" \

protoc \
    --proto_path="$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src" \
    --plugin="protoc-gen-ts=$FLUSTER_NATIVE_ROOT/packages/fluster_ts/node_modules/.bin/protoc-gen-ts" \
    --ts_opt=esModuleInterop=true \
    --ts_out="$FLUSTER_NATIVE_ROOT/packages/fluster_ts/src/generated/grpc" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/database.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/mdx.proto" \
    "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc/rust/src/proto/settings.proto" \
