use std::ops::Index;

use ollama_rs::{
    generation::embeddings::request::{EmbeddingsInput, GenerateEmbeddingsRequest},
    Ollama,
};
use text_splitter::MarkdownSplitter;

use crate::{
    core::{
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
        types::errors::errors::FlusterResult,
    },
    features::{
        ai::{data::constants::VECTOR_DIMENSIONS, utils::flatten_vector::flatten_vector},
        mdx::data::mdx_note_group::MdxNoteGroup,
    },
};

pub async fn get_embedding(
    content: &str,
    max_tokens: usize,
    model: String,
    ollama: &Ollama,
) -> Vec<f32> {
    let splitter = MarkdownSplitter::new(max_tokens);
    let chunks = splitter.chunks(content);
    let request = GenerateEmbeddingsRequest::new(
        model.clone(),
        EmbeddingsInput::Multiple(chunks.map(|x| x.to_string()).collect()),
    );
    if let Ok(res) = ollama.generate_embeddings(request).await {
        println!("Embedding vector length: {:?}", res.embeddings.len());
        if res.embeddings.is_empty() {
            println!("Empty file: {:?}", content);
        }
        return flatten_vector(res.embeddings);
    } else {
        log::error!("Failed to generate embedding");
        println!("Failed to generate embedding");
    }
    (0..VECTOR_DIMENSIONS).map(|_| 0.0).collect::<Vec<f32>>()
}

pub struct LocalAiClient {}

impl LocalAiClient {
    pub async fn get_text_embeddings(
        &self,
        notes: &mut [MdxNoteGroup],
        opts: &SyncFilesystemDirectoryOptions,
    ) -> FlusterResult<()> {
        let ollama = Ollama::default();

        let vec_default = (0..VECTOR_DIMENSIONS).map(|_| 0.0).collect::<Vec<f32>>();

        for note in notes.iter_mut() {
            if opts.ai.with_ai {
                note.mdx.vec = get_embedding(
                    &note.mdx.raw_body,
                    opts.ai.max_text_split_tokens,
                    opts.ai.embedding_model.clone(),
                    &ollama,
                )
                .await;
                // TODO: Convert this back to generating actual embeddings.
            } else if note.mdx.vec.len() != (VECTOR_DIMENSIONS as usize) {
                note.mdx.vec = vec_default.clone();
            }
        }
        Ok(())
    }
}
