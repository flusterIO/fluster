use ollama_rs::Ollama;
use serde::{Deserialize, Serialize};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[derive(Serialize, Deserialize, specta::Type)]
pub struct LocalModelData {
    pub name: String,
    pub modified_at: String,
    pub size: u64,
}

#[tauri::command]
#[specta::specta]
pub async fn get_local_ollama_models() -> FlusterResult<Vec<LocalModelData>> {
    let ollama = Ollama::default();
    let res = ollama
        .list_local_models()
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToGetModels
        })?
        .iter()
        .map(move |x| LocalModelData {
            name: x.name.clone(),
            modified_at: x.modified_at.clone(),
            size: x.size,
        })
        .collect();
    Ok(res)
}
