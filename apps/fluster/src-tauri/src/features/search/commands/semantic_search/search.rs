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

mod tests {

    use crate::core::sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::DEFAULT_LOCAL_EMBEDDING_MODEL;

    #[cfg(test)]
    use super::*;

    #[tokio::test]
    async fn gets_semantic_search_results() {
        let res = semantic_search(
            "Find me notes about gravity.".to_string(),
            AiSyncSettings {
                embedding_model: DEFAULT_LOCAL_EMBEDDING_MODEL.to_string(),
                with_ai: true,
            },
            PaginationProps {
                per_page: 10,
                page_number: 1,
            },
        )
        .await
        .expect("Returns semantic results without throwing an error.");
        assert!(!res.notes.is_empty(), "Returns a non-empty list.");
        // assert_eq!(result, 4);
    }
}
