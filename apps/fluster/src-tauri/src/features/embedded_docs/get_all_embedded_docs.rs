use serde::{Deserialize, Serialize};

use crate::{core::types::errors::errors::FlusterResult, features::embedded_docs::docs::DOCS};

#[derive(Serialize, Deserialize, specta::Type)]
pub struct EmbbeddedDocFile {
    content: String,
    path: String,
}

#[tauri::command]
#[specta::specta]
pub async fn get_all_embedded_docs() -> FlusterResult<Vec<EmbbeddedDocFile>> {
    let mut items: Vec<EmbbeddedDocFile> = Vec::new();
    DOCS.files().for_each(|f| {
        if let Some(path) = f.path().to_str() {
            if path.ends_with(".mdx") {
                items.push(EmbbeddedDocFile {
                    content: f.contents_utf8().unwrap_or("").to_string(),
                    path: path.to_string(),
                });
            }
        }
    });
    Ok(items)
}
