use std::ops::Index;

use crate::{
    core::{
        database::{db_utils::create_table_if_not_exist, tables::table_paths::DatabaseTables},
        types::{errors::errors::FlusterError, traits::db_entity::VectorDbEntity},
    },
    features::ai::data::models::{
        providers::ai_provider::AiProvider,
        vector::{
            vector_entity::VectorEntity,
            vector_model::{VectorModel, VectorSource},
        },
    },
};
use ollama_rs::{generation::embeddings::request::GenerateEmbeddingsRequest, Ollama};
use rayon::{
    iter::{IntoParallelRefIterator, ParallelIterator},
    ThreadPoolBuilder,
};
use serde_json::json;
use text_splitter::MarkdownSplitter;

pub struct OllamaProvider {}

impl AiProvider for OllamaProvider {
    async fn save_note_vectors(
        &self,
        db: &crate::core::types::FlusterDb<'_>,
        opts: &crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
        notes: Vec<crate::features::mdx::data::mdx_note_group::MdxNoteGroup>,
    ) -> crate::core::types::errors::errors::FlusterResult<bool> {
        let ollama = Ollama::new(opts.ollama_url.clone(), opts.ollama_port);

        let threads: usize = opts.n_threads.parse().unwrap();
        let thread_pool = ThreadPoolBuilder::new()
            .num_threads(threads)
            .build()
            .map_err(|_| FlusterError::FailToGenerateVectors)?;

        let markdown_splitter = MarkdownSplitter::new(opts.min_chunk_length..opts.max_chunk_length);
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

        let mut vectors: Vec<VectorModel> = Vec::new();

        let flat_docs = docs
            .iter()
            .flatten()
            .map(|x| x.content.clone())
            .collect::<Vec<String>>();

        for doc_vec in &mut docs {
            for doc in doc_vec {
                let request = GenerateEmbeddingsRequest::new(
                    opts.ai.embedding_model.clone(),
                    doc.content.clone().into(),
                );
                let res = ollama.generate_embeddings(request).await.map_err(|e| {
                    println!("Error: {}", e);
                    FlusterError::FailToGenerateVectors
                })?;
                doc.vec = res.embeddings.index(0).clone();
                vectors.push(doc.clone())
            }
        }

        create_table_if_not_exist(
            db,
            DatabaseTables::Vector,
            &VectorEntity::arrow_schema(vectors.index(0).vec.len() as i32),
        )
        .await?;

        VectorEntity::save_many(db, &vectors)
            .await
            .map_err(|_| FlusterError::DatabaseError)?;

        Ok(true)
    }
}
