# Change into proper dir
cd "$FLUSTER_NATIVE_ROOT/packages/fluster_grpc" || exit
# Execute that dude...
OUTPUT_DEBUG_PROTOS="true" sh "$FLUSTER_NATIVE_ROOT/scripts/.proto_build_script.sh"

echo "Output debug protos"
