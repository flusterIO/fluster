use crate::core::{
    database::db::get_database,
    models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
    types::errors::errors::FlusterResult,
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_tags() -> FlusterResult<Vec<SharedTaggableModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TagEntity::get_many(&db).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_all_tags() {
        let res = get_all_tags()
            .await
            .expect("Returns tags without throwing an error.");
        assert!(!res.is_empty(), "Returns non-empty tag vec.");
    }
}
