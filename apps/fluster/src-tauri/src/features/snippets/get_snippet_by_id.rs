use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::snippets::data::snippet_tag_entity::SnippetTagEntity,
};

use super::data::{snippet_entity::SnippetEntity, snippet_model::SnippetModel};

#[tauri::command]
#[specta::specta]
pub async fn get_snippet_by_id(
    id: String,
) -> FlusterResult<(SnippetModel, Vec<SharedTaggableModel>)> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let snippet = SnippetEntity::get_by_id(id, &db).await?;
    let snippet_tags = SnippetTagEntity::get_by_snippet_ids(&db, vec![snippet.id.clone()]).await?;
    let tags = TagEntity::get_by_values(
        &db,
        snippet_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    Ok((snippet, tags))
}
