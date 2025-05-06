use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Debug, Deserialize, Serialize, Clone, Default, Copy)]
#[wasm_bindgen]
pub enum NoteType {
    #[default]
    Mdx,
    Markdown,
}
