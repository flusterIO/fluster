use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::data::{mdx_note_entity::MdxNoteEntity, mdx_note_group::MdxNoteGroup},
        search::types::PaginationProps,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn mdx_note_full_text_search(
    query: String,
    pagination: PaginationProps,
) -> FlusterResult<Vec<MdxNoteGroup>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;

    let res = MdxNoteEntity::full_text_search(&db, &query, &pagination).await?;

    println!("Response: {:#?}", res);

    // let items = mdx_note_models_to_mdx_note_groups(&db, res).await?;

    // Ok(items)
    Ok(Vec::new())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn mdx_full_text_search_functionality() {
        let res = mdx_note_full_text_search(
            "gravity".to_string(),
            PaginationProps {
                per_page: 50,
                page_number: 1,
            },
        )
        .await
        .expect("Returns a result without throwing an error.");
        assert!(!res.is_empty(), "Returns a non-empty result.");
        // assert_eq!(result, 4);
    }
}
