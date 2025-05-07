use flutter_rust_bridge::frb;

pub use crate::api::forced_imports::*;
pub use rust_embed::EmbeddedFile;

#[derive(rust_embed::Embed)]
#[folder = "../../fluster_embedded_typescript/dist"]
#[frb(opaque)]
pub struct EmbeddedTypescriptFiles;
