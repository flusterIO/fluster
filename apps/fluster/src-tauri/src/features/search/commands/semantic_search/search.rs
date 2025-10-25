use std::ops::Index;

use crate::{
    core::{
        database::{
            db::{get_database, get_table},
            tables::table_paths::DatabaseTables,
        },
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::AiSyncSettings,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::{
        ai::data::models::vector::vector_model::{
            MdxNoteVectorData, VectorModel, VectorModelWithDistance,
        },
        mdx::{
            data::{mdx_note_entity::MdxNoteEntity, mdx_note_model::MdxNoteModel},
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        search::types::PaginationProps,
    },
};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use ollama_rs::{generation::embeddings::request::GenerateEmbeddingsRequest, Ollama};
use serde_arrow::from_record_batch;

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
    let embedding_request = GenerateEmbeddingsRequest::new(ai.embedding_model, query.into());
    let res = ollama
        .generate_embeddings(embedding_request)
        .await
        .map_err(|e| {
            println!("Error in semantic_search: {:?}", e);
            FlusterError::FailToCreateEmbeddingVector
        })?;

    if res.embeddings.len() == 1 {
        let query_vec = res.embeddings.index(0);

        let vector_table = get_table(&db, DatabaseTables::Vector).await?;

        let search_results = vector_table
            .query()
            .nearest_to(query_vec.clone())
            .map_err(|_| FlusterError::FailToGenerateVectors)?
            .select(lancedb::query::Select::Columns(vec![
                "id".to_string(),
                "source".to_string(),
                "content".to_string(),
                "data".to_string(),
                "_distance".to_string(),
            ]))
            .execute()
            .await
            .map_err(|e| {
                println!("Error: {}", e);
                FlusterError::FailToPerformSemanticSearch
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error: {}", e);
                FlusterError::FailToPerformSemanticSearch
            })?;

        let mut file_paths: Vec<String> = Vec::new();
        for batch in search_results.iter() {
            let batch_schema = batch.schema();
            println!("Batch Schema: {:?}", batch_schema);
            println!("Batch: {:?}", batch);
            // println!("Distance: {:?}", batch.column("distance").to_data());
            let data: Vec<VectorModelWithDistance> = from_record_batch(batch).map_err(|e| {
                println!("Error in from_record_batch: {}", e);
                FlusterError::FailToSerialize
            })?;
            for vector_model in data {
                let json_data: MdxNoteVectorData = serde_json::from_str(&vector_model.data)
                    .map_err(|_| FlusterError::FailToParseJsonString)?;
                if !file_paths.iter().any(|x| x == &json_data.file_path) {
                    file_paths.push(json_data.file_path);
                }
            }
        }

        let mdx_notes = MdxNoteEntity::get_by_file_paths(&db, file_paths).await?;

        let sorted_file_paths: Vec<String> = Vec::new();

        let sorted_notes: Vec<MdxNoteModel> = Vec::new();

        let mdx_note_groups = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

        Ok(SemanticSearchResults {
            notes: mdx_note_groups,
        })
    } else {
        println!("Failed to query semantic search.");
        Err(FlusterError::FailToCreateEmbeddingVector)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_semantic_search() {
        let res = semantic_search(
            "physics".to_string(),
            AiSyncSettings {
                embedding_model: "nomic-embed-text:latest".to_string(),
                language_model: "".to_string(),
                with_ai: true,
                max_text_split_tokens: 500,
            },
            PaginationProps {
                per_page: 10,
                page_number: 1,
            },
        )
        .await;

        println!("Response: {:?}", res);

        assert!(
            res.is_ok(),
            "Returns semantic search results without throwing an error."
        );
        assert!(
            !res.unwrap().notes.is_empty(),
            "Returns a non-empty array of mdx notes."
        );
        // assert_eq!(result, 4);
    }
}
