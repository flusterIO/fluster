format_everything:
	dart fix
	pnpm syncpack format
generate_icons:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/ && flutter pub run flutter_launcher_icons -f ${FLUSTER_NATIVE_ROOT}/apps/fluster/flutter_launcher_icons.yaml
run_builders:
	cd ${FLUSTER_NATIVE_ROOT} && flutter pub run build_runner build --delete-conflicting-outputs
build_protos:
	${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/fluster_internal_workspace generate_grpc_script
	${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc/scripts/clean.sh
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc && ${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc/scripts/distribute_proto.sh
build_rust:
	trash ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/lib/src/rust/**
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface && flutter_rust_bridge_codegen generate
test_flutter:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster && flutter test ${FLUSTER_NATIVE_ROOT}/apps/fluster --coverage --no-pub --coverage-path $FLUSTER_NATIVE_ROOT/apps/fluster/.coverage/lcov.info && flutter pub global run test_cov_console --file=$FLUSTER_NATIVE_ROOT/apps/fluster/.coverage/lcov.info
test_rust:
	cargo llvm-cov --html
build_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go/ && go build
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/ && go build
test_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_cli && go test -cover -coverprofile $FLUSTER_NATIVE_ROOT/packages/fluster_cli/.coverage/coverage.out
build_node:
	pnpm syncpack format
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts && pnpm build
build_python:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_py && python -m build
distribute_python: build_python
	twine upload ${FLUSTER_NATIVE_ROOT}/packages/fluster_py/dist/
cross_language_pre_build: run_builders
	zsh ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/scripts/pre_build.zsh
build_workspace_tools:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace && go build
generate_docs:
	cargo doc --workspace --no-deps
generate_docs_with_dependencies:
	cargo doc --workspace
build_desktop: cross_language_pre_build, build_protos, build_node, build_go, build_rust

distribute_node: build_node
    cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts && npm publish
