use crate::core::types::errors::errors::FlusterResult;

pub trait LocalAiProvider {
    fn get_text_embeddings(&self, chunks: &[&str]) -> FlusterResult<()>;
}
