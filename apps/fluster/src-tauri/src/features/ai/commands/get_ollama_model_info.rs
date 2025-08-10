use ollama_rs::Ollama;
use serde::{Deserialize, Serialize};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

#[derive(Serialize, Deserialize, specta::Type)]
pub struct LocalModelDetailData {
    pub license: String,
    pub modelfile: String,
    pub parameters: String,
    pub template: String,
    // pub model_info: serde_json::Map<String, serde_json::Value>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_ollama_model_info(model_name: String) -> FlusterResult<LocalModelDetailData> {
    let ollama = Ollama::default();
    let res = ollama.show_model_info(model_name).await.map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToGetModels
    })?;
    println!("Model info: {:?}", Some(res.model_info));
    Ok(LocalModelDetailData {
        license: res.license,
        modelfile: res.modelfile,
        parameters: res.parameters,
        template: res.template,
        // model_info: res.model_info,
    })
}
