use std::ops::Index;

use crate::{
    core::{
        database::db::get_database,
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::AiSyncSettings,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::{
        mdx::{
            data::mdx_note_entity::MdxNoteEntity,
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        search::types::PaginationProps,
    },
};
use ollama_rs::{generation::embeddings::request::GenerateEmbeddingsRequest, Ollama};

use super::semantic_search_results::SemanticSearchResults;

#[tauri::command]
#[specta::specta]
pub async fn semantic_search(
    query: String,
    ai: AiSyncSettings,
    pagination: PaginationProps,
) -> FlusterResult<SemanticSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let ollama = Ollama::default();
    let embedding_request = GenerateEmbeddingsRequest::new(
        ai.embedding_model,
        ollama_rs::generation::embeddings::request::EmbeddingsInput::Single(query),
    );
    let res = ollama
        .generate_embeddings(embedding_request)
        .await
        .map_err(|e| {
            println!("Error in semantic_search: {:?}", e);
            FlusterError::FailToCreateEmbeddingVector
        })?;

    if res.embeddings.len() == 1 {
        let query_vec = res.embeddings.index(0);

        let mdx_notes = MdxNoteEntity::semantic_search(&db, query_vec, &pagination).await?;

        let mdx_note_groups = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

        Ok(SemanticSearchResults {
            notes: mdx_note_groups,
        })
    } else {
        println!("Failed to query semantic search.");
        Err(FlusterError::FailToCreateEmbeddingVector)
    }
}
