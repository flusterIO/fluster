use include_dir::{include_dir, Dir};

pub static DOCS: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/features/embedded_docs/embedded_docs");
