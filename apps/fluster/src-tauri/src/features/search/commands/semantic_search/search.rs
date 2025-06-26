use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::mdx::{
        data::mdx_note_entity::MdxNoteEntity,
        methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
    },
};
use kalosm::language::{Bert, EmbedderExt};
use log::error;

use super::semantic_search_results::SemanticSearchResults;

#[tauri::command]
#[specta::specta]
pub async fn semantic_search(query: String) -> FlusterResult<SemanticSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let bert = Bert::new_for_search().await.map_err(|e| {
        error!("Error: {:?}", e);
        FlusterError::FailToLoadModel
    })?;

    let query_vec = bert.embed(query).await.map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateEmbeddingVector
    })?;

    let mdx_notes = MdxNoteEntity::semantic_search(&db, &query_vec).await?;

    let mdx_note_groups = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

    Ok(SemanticSearchResults {
        notes: mdx_note_groups,
    })
    // let query_vec =
}

mod tests {
    #[cfg(test)]
    use super::*;

    #[tokio::test]
    async fn gets_semantic_search_results() {
        let res = semantic_search("Find me notes about gravity.".to_string())
            .await
            .expect("Returns semantic results without throwing an error.");
        assert!(!res.notes.is_empty(), "Returns a non-empty list.");
        // assert_eq!(result, 4);
    }
}
