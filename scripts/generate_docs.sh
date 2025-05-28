/Users/bigsexy/dev-utils/lib/mermaid-cli/src/cli.js --input "$FLUSTER_NATIVE_ROOT/docs/diagram_inputs/architecture.mermaid" --output "$FLUSTER_NATIVE_ROOT/docs/doc_assets/generated/architecture.svg" --backgroundColor transparent theme dark
/Users/bigsexy/dev-utils/lib/mermaid-cli/src/cli.js --input "$FLUSTER_NATIVE_ROOT/docs/diagram_inputs/package_flow.mermaid" --output "$FLUSTER_NATIVE_ROOT/docs/doc_assets/generated/package_flow.svg" --backgroundColor transparent theme dark

cargo doc --workspace --no-deps
