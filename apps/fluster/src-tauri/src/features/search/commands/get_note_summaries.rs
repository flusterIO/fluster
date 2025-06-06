use crate::{
    core::{
        database::db::get_database,
        types::{errors::errors::FlusterResult, FlusterDb},
    },
    features::{
        mdx::data::front_matter_entity::FrontMatterEntity,
        search::types::{NoteSummary, PaginationProps},
    },
};

pub async fn get_all_note_summaries(
    db: &FlusterDb<'_>,
    pagination: &PaginationProps,
) -> FlusterResult<Vec<NoteSummary>> {
    FrontMatterEntity::get_all(db, pagination).await
}

#[tauri::command]
#[specta::specta]
pub async fn get_note_summaries(pagination: PaginationProps) -> FlusterResult<Vec<NoteSummary>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    get_all_note_summaries(&db, &pagination).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_note_summaries() {
        let res = get_note_summaries(PaginationProps::default()).await;
        assert!(
            res.is_ok(),
            "Returns note summaries without throwing an error."
        );
        assert!(
            !res.unwrap().is_empty(),
            "Returns a non-empty list of NoteSummary structs."
        );
    }
}
