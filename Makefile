PROJECT_NAME := $(shell basename $(PWD))
COMMIT=$(shell git rev-parse HEAD)
BRANCH=$(shell git rev-parse --abbrev-rev HEAD)
BUILD_DATE := $(shell date -u +"%Y-%m-%d%H:%M:%SZ")
VERSION := $(shell git describe --tags --abbrev=0)


set_version:
	FLUSTER_VERSION=${VERSION} tsx ${FLUSTER_NATIVE_ROOT}/scripts/set_package_version.ts
format_everything: set_version
	dart fix
	pnpm syncpack format
generate_icons:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/; flutter pub run flutter_launcher_icons -f flutter_launcher_icons.yaml
run_builders:
	cd ${FLUSTER_NATIVE_ROOT}; dart run build_runner build --delete-conflicting-outputs
build_protos: build_go
	${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/fluster_internal_workspace generate_grpc_script
	${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc/scripts/clean.sh
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc; ${FLUSTER_NATIVE_ROOT}/packages/fluster_grpc/scripts/distribute_proto.sh
lock_package_json_versions:
	/Users/bigsexy/Desktop/fluster/node_modules/.pnpm/syncpack@13.0.3_typescript@5.8.3/node_modules/syncpack/dist/index.js
build_embedded_ts:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/typescript; pnpm install
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/typescript; pnpm build
build_node: build_embedded_ts
	pnpm syncpack format
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; pnpm build
run_migrations:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/src-tauri; DATABASE_URL=${FLUSTER_DB_URI} diesel migration run --config-file=${FLUSTER_NATIVE_ROOT}/apps/fluster/src-tauri/diesel.toml
build_rust: build_embedded_ts run_migrations
	rm -rf ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/lib/src/rust/**
test_rust:
	cargo llvm-cov nextest --html
test_flutter:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster; flutter test ${FLUSTER_NATIVE_ROOT}/apps/fluster --coverage --no-pub --coverage-path $FLUSTER_NATIVE_ROOT/apps/fluster/.coverage/lcov.info && flutter pub global run test_cov_console --file=$FLUSTER_NATIVE_ROOT/apps/fluster/.coverage/lcov.info
build_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go/; go build
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/; go build
test_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_cli; go test -cover -coverprofile $FLUSTER_NATIVE_ROOT/packages/fluster_cli/.coverage/coverage.outj
build_python:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_py; python -m nuitka --follow-imports fluster_py
distribute_python: build_python
	twine upload ${FLUSTER_NATIVE_ROOT}/packages/fluster_py/dist/
cross_language_pre_build: run_builders
	zsh ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/scripts/pre_build.zsh
build_workspace_tools:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace; go build
generate_mermaid_db_diagram:
	pg-mermaid --username postgres --password password --dbname fluster --output-path ${FLUSTER_NATIVE_ROOT}/docs/doc_assets/db.mermaid
	mmdc -i ${FLUSTER_NATIVE_ROOT}/docs/doc_assets/db.mermaid -o ${FLUSTER_NATIVE_ROOT}/docs/doc_assets/db.png
generate_docs: generate_icons
	cargo doc --workspace --no-deps
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; pnpm dlx typedoc --plugin typedoc-plugin-markdown --out ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_ts/
	lazydocs ${FLUSTER_NATIVE_ROOT}/packages/fluster_py --output-path ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_py --output-format=mdx
	lazydocs ${FLUSTER_NATIVE_ROOT}/packages/fluster_py03 --output-path ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_py03 --output-format=mdx
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go; gomarkdoc -o ${FLUSTER_NATIVE_ROOT}/docs/api/packages/fluster_go/
generate_docs_with_dependencies:
	cargo doc --workspace
reset_database:
	dropdb fluster
	createdb fluster
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/rust; DATABASE_URL=${FLUSTER_DB_URI} diesel migration run --config-file=${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/rust/diesel.toml
clean_build:
	tsx ${FLUSTER_NATIVE_ROOT}/scripts/clean.ts
	cargo clean
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster; flutter clean
typeshare:
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_models --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/src/generated/fluster_models
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_ts/src/generated/fluster_native_interface
	typeshare ${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface --lang=typescript --output-folder=${FLUSTER_NATIVE_ROOT}/packages/fluster_native_interface/typescript/src/generated
cross_language_sync: typeshare cross_language_pre_build build_embedded_ts build_go
distribute_node: build_node
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; npm publish
build_desktop: cross_language_pre_build build_protos build_node build_go build_rust
	@echo "building..." 
