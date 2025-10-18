PROJECT_NAME := $(shell basename $(PWD))
COMMIT=$(shell git rev-parse HEAD)
BRANCH=$(shell git rev-parse --abbrev-rev HEAD)
BUILD_DATE := $(shell date -u +"%Y-%m-%d%H:%M:%SZ")
VERSION := $(shell git describe --tags --abbrev=0)


format_package_jsons:
	pnpm syncpack format
manual_postinstall:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster; pnpm manual_postinstall
format_everything: format_package_jsons
syncpack_fix_mismatches:
	npx syncpack fix-mismatches
build_developer_typescript:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_developer; pnpm build
build_python_sidecar:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster; pnpm build:python
generate_python_types:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/src-tauri; cargo test export_bindings
copy_plugin_template:
	cp -r ${FLUSTER_NATIVE_ROOT}/apps/local_plugin_template_example/ "/Users/bigsexy/Library/Application Support/Fluster/plugins"
build_node: build_developer_typescript
	pnpm syncpack format
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_ts; pnpm build
test_rust:
	cargo llvm-cov nextest --html
tauri_version_match:
	${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/fluster_internal_workspace tauri_version_match
local_deps_to_remote_version:
	${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/fluster_internal_workspace set_local_dependency_source version
local_deps_to_workspace_version:
	${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/fluster_internal_workspace set_local_dependency_source
build_go:
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_go/; go build
	cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_internal_workspace/; go build
test_go:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/src-tauri; cd ${FLUSTER_NATIVE_ROOT}/packages/fluster_cli; go test -cover -coverprofile $FLUSTER_NATIVE_ROOT/packages/fluster_cli/.coverage/coverage.outj
generate_plotly_themes_from_python:
	python ./scripts/generate_plotly_themes.py
generate_embedded_python_artifacts:
	cd ${FLUSTER_NATIVE_ROOT}/apps/fluster/src-tauri; pyoxidizer generate-python-embedding-artifacts pyembedded
build_embedded_python:
	pyoxidizer build
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
nocheck_bindings_file:
	packages/fluster_internal_workspace/fluster_internal_workspace nocheck_bindings
release_npm: format_package_jsons
	scripts/release_npm.zsh
release_tauri: format_package_jsons
	scripts/release_tauri.zsh
post_release_revert:
	scripts/post_release_revert.zsh
