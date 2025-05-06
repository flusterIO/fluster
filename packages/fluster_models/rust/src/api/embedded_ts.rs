pub use crate::api::forced_imports::*;

#[derive(rust_embed::Embed)]
#[folder = "../../../packages/fluster_embedded_typescript/dist/sync_bibliography/"]
pub struct EmbeddedTypescriptFiles;
