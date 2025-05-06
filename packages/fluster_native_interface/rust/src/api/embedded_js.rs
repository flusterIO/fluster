use flutter_rust_bridge::frb;
use rust_embed::Embed;

// #[allow(wajrnings, invalid_macro_export_arguments)]
#[frb(opaque)]
#[derive(Embed)]
#[folder = "../../fluster_embedded_typescript/dist/"]
pub struct EmbededJsFiles;
