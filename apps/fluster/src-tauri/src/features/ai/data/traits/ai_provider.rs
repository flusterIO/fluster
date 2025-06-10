use crate::{
    core::types::errors::errors::FlusterResult,
    features::ai::data::types::embeddings_result::EmbeddingResult,
};

pub trait AiProvider {
    fn get_text_embeddings(&self, dir_path: &str) -> FlusterResult<EmbeddingResult>;
}
