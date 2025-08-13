use ollama_rs::Ollama;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[tauri::command]
#[specta::specta]
pub async fn ollama_model_exists_locally(model_name: String) -> FlusterResult<bool> {
    let ollama = Ollama::default();
    let name = model_name.to_lowercase();
    let res = ollama
        .list_local_models()
        .await
        .map_err(|e| {
            println!("Error in ollama_model_exists_locally: {:?}", e);
            FlusterError::FailToGetModels
        })?
        .iter()
        .any(|x| x.name.to_lowercase() == name);
    Ok(res)
}
