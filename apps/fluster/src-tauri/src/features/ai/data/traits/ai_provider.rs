use async_trait::async_trait;

use crate::{
    core::types::errors::errors::FlusterResult,
    features::ai::data::types::embeddings_result::EmbeddingResult,
};

#[async_trait]
pub trait AiProvider {
    async fn get_text_embeddings(&self, dir_path: &str) -> FlusterResult<EmbeddingResult>;
}
