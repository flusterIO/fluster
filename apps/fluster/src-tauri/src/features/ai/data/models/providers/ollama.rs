use std::ops::Index;

use crate::{
    core::types::errors::errors::FlusterError,
    features::ai::data::models::{
        providers::ai_provider::AiProvider,
        vector::vector_model::{VectorModel, VectorSource},
    },
};
use crossbeam_channel::unbounded;
use ollama_rs::{generation::embeddings::request::GenerateEmbeddingsRequest, Ollama};
use rayon::{
    iter::{IntoParallelRefIterator, ParallelIterator},
    ThreadPoolBuilder,
};
use rig::{
    client::EmbeddingsClient,
    embeddings::{EmbeddingModel, EmbeddingsBuilder},
};
use serde_json::json;
use text_splitter::MarkdownSplitter;

pub struct OllamaProvider {}

impl AiProvider for OllamaProvider {
    async fn get_note_vectors(
        &self,
        db: &crate::core::types::FlusterDb<'_>,
        opts: &crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
        notes: Vec<crate::features::mdx::data::mdx_note_group::MdxNoteGroup>,
    ) -> crate::core::types::errors::errors::FlusterResult<bool> {
        // let mut client = rig::providers::ollama::ClientBuilder::new();
        // if let Some(ollama_override_url) = &opts.use_ollama_url_override {
        //     client = client.base_url(&ollama_override_url)
        // }
        // let ollama_client = client
        //     .build()
        //     .map_err(|_| FlusterError::FailToGenerateVectors)?;
        // let embedding_model = ollama_client.embedding_model(&opts.ai.embedding_model);

        // let embeddings: EmbeddingsBuilder<rig::providers::ollama::EmbeddingModel, VectorModel> =
        //     EmbeddingsBuilder::new(embedding_model.clone());
        let ollama = Ollama::new(opts.ollama_url.clone(), opts.ollama_port.clone());

        let threads: usize = opts.n_threads.parse().unwrap();
        let thread_pool = ThreadPoolBuilder::new()
            .num_threads(threads)
            .build()
            .map_err(|_| FlusterError::FailToGenerateVectors)?;

        let markdown_splitter = MarkdownSplitter::new(200..1000);
        let mut docs = thread_pool.install(move || {
            notes
                .par_iter()
                .map(|note| {
                    let split_note_content = markdown_splitter.chunks(&note.mdx.raw_body);
                    split_note_content
                        .enumerate()
                        .map(|chunk_data| {
                            let (chunk_index, chunk) = chunk_data;
                            VectorModel {
                                id: format!("note-{}:{}", note.mdx.file_path, chunk_index),
                                content: chunk.to_string(),
                                source: VectorSource::MdxNote,
                                data: json!({
                                "file_path": note.mdx.file_path.clone()
                                })
                                .to_string(),
                                vec: Vec::new(),
                            }
                        })
                        .collect()
                })
                .collect::<Vec<Vec<VectorModel>>>()
        });

        for doc_vec in &mut docs {
            for doc in doc_vec {
                let request = GenerateEmbeddingsRequest::new(
                    opts.ai.embedding_model.clone(),
                    vec![doc.content.clone()].into(),
                );
                let res = ollama.generate_embeddings(request).await.unwrap();
                println!("Vector Length: {}", res.embeddings.len());
                doc.vec = res.embeddings.index(0).clone();
            }
        }

        Ok(true)
    }
}
