use chrono::Utc;

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::task_manager::{
        task_entity::TaskEntity, task_model::TaskModel, task_tag_entity::TaskTagEntity,
        task_tag_model::TaskTagModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn create_task(task: TaskModel, tags: Vec<TaskTagModel>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskEntity::save_many(&db, vec![task.clone()]).await?;
    let now = Utc::now();
    TagEntity::save_many(
        &db,
        tags.iter()
            .map(|x| SharedTaggableModel {
                value: x.tag_value.clone(),
                ctime: now.timestamp_millis().to_string(),
            })
            .collect(),
    )
    .await?;
    let existing_task_tags = TaskTagEntity::get_by_task_ids(&db, vec![task.id.clone()]).await?;
    let mut tag_values_to_remove: Vec<String> = Vec::new();
    for existing_tag in existing_task_tags {
        let is_included = tags
            .iter()
            .any(|x| x.tag_value == existing_tag.tag_value && x.task_id == existing_tag.task_id);
        if !is_included {
            tag_values_to_remove.push(existing_tag.tag_value);
        }
    }
    TaskTagEntity::create_many(&db, tags).await?;
    if !tag_values_to_remove.is_empty() {
        TaskTagEntity::delete_by_tag_values(&db, tag_values_to_remove).await?;
    }
    Ok(())
}
