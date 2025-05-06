use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Debug, Tsify, Serialize, Deserialize, Default, Clone)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CrossLanguageFile {
    pub path: String,
    pub note_type: crate::api::models::enums::parsable_file_extension::NoteType,
}
