use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::database::db::get_data_dir;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct MathjaxData {
    pub root: String,
    pub main_path: String,
    pub font_path: String,
}

/// Returns the string which points the location of mathjax that needs to be passed to the front
/// end. This is the location that mathjax is copied *to*, not from.
#[tauri::command]
#[specta::specta]
pub fn get_mathjax_path() -> MathjaxData {
    let base_path = get_data_dir().unwrap().join("mathjax");
    MathjaxData {
        root: base_path.to_str().unwrap().to_string(),
        main_path: base_path.join("data").to_str().unwrap().to_string(),
        font_path: base_path.join("fonts").to_str().unwrap().to_string(),
    }
}
