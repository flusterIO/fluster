use kalosm::language::*;

use crate::{
    core::types::errors::errors::{FlusterError, FlusterResult},
    features::ai::data::{
        traits::ai_provider::AiProvider, types::embeddings_result::EmbeddingResult,
    },
};

pub struct LocalAiClient {}

impl AiProvider for LocalAiClient {
    fn get_text_embeddings(&self, dir_path: &str) -> FlusterResult<EmbeddingResult> {
        let f = DocumentFolder::new(dir_path).unwrap();
        println!("DocumentFolder: {:?}", f);
        Err(FlusterError::NotImplemented)
    }

    // pub async fn get_embeddings(dir_path: &str) -> FlusterResult<()> {
    //     let f = DocumentFolder::new(dir_path).unwrap();
    //     Ok(())
    // }
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
        // assert_eq!(result, 4);
    }
}
