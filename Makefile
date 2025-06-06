PROJECT_NAME := $(shell basename $(PWD))
COMMIT=$(shell git rev-parse HEAD)
BRANCH=$(shell git rev-parse --abbrev-rev HEAD)
BUILD_DATE := $(shell date -u +"%Y-%m-%d%H:%M:%SZ")
VERSION := $(shell git describe --tags --abbrev=0)


format_package_jsons:
	pnpm syncpack format
format_everything: format_package_jsons
syncpack_fix_mismatches:
	npx syncpack fix-mismatches
build_developer_typescript:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_developer; pnpm build
build_node: build_developer_typescript
	pnpm syncpack format
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; pnpm build
test_rust:
	cargo llvm-cov nextest --html
build_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go/; go build
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/; go build
test_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_cli; go test -cover -coverprofile $FLUSTER_NATIVE_ROOT/packages/fluster_cli/.coverage/coverage.outj
build_python:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_py; python -m nuitka --follow-imports fluster_py
distribute_python: build_python
	twine upload ${FLUSTER_NATIVE_ROOT}/packages/fluster_py/dist/
cross_language_pre_build:
	zsh ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/scripts/pre_build.zsh
build_workspace_tools:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace; go build
generate_docs: generate_icons
	cargo doc --workspace --no-deps
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; pnpm dlx typedoc --plugin typedoc-plugin-markdown --out ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_ts/
	lazydocs ${FLUSTER_NATIVE_ROOT}/packages/fluster_py --output-path ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_py --output-format=mdx
	lazydocs ${FLUSTER_NATIVE_ROOT}/packages/fluster_py03 --output-path ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_py03 --output-format=mdx
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go; gomarkdoc -o ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_go/
generate_docs_with_dependencies:
	cargo doc --workspace
reset_database:
	trash "/Users/bigsexy/Library/Application Support/Fluster/data/"
clean_build:
	tsx ${FLUSTER_NATIVE_ROOT}/scripts/clean.ts
	cargo clean
typeshare:
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_models --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/src/generated/fluster_models
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/src/generated/fluster_native_interface
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/typescript/src/generated
cross_language_sync: typeshare cross_language_pre_build build_embedded_ts build_go
distribute_node: build_node
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; npm publish
nocheck_bindings_file:
	packages/fluster_internal_workspace/fluster_internal_workspace nocheck_bindings
build_macos: nocheck_bindings_file
	cargo tauri build -b="app" -t="universal-apple-darwin"
build_desktop: cross_language_pre_build build_protos build_node build_go build_rust
	@echo "building..." 
