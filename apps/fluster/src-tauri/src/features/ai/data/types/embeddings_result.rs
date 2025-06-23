use std::collections::HashMap;

pub type EmbeddingVec = Vec<f32>;

/// A map of the file system path and the embedding vector.
pub type EmbeddingResult = HashMap<String, EmbeddingVec>;
