use kalosm::language::*;

use crate::{
    core::types::errors::errors::{FlusterError, FlusterResult},
    features::ai::data::types::embeddings_result::EmbeddingResult,
};
use log::{error};

pub struct LocalAiClient {}

// FIX: Move this all to a trait once this is in order to allow for a remote client as well.
impl LocalAiClient {
    pub async fn get_text_embeddings(&self, dir_path: &str) -> FlusterResult<EmbeddingResult> {
        let _bert = Bert::new().await.map_err(|e| {
            error!("Error: {:?}", e);
            FlusterError::FailToLoadModel
        })?;
        // if bert.
        let f = DocumentFolder::new(dir_path).unwrap();
        println!("DocumentFolder: {:?}", f);
        // let l = Llama::new().await.unwrap();
        // let mut chat = l.chat();
        // let res = chat.add_message("Why is the sky blue?").await;
        // println!("Response: {:?}", res);
        Err(FlusterError::NotImplemented)
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[tokio::test]
    async fn gets_embeddings() {
        let res = LocalAiClient {}
            .get_text_embeddings("/Users/bigsexy/Desktop/notes/content/")
            .await;
        assert!(res.is_ok(), "Get's embeddings without throwing an error.");
    }
}
