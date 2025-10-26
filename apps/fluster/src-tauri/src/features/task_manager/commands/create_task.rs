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
    // -- Get existing tags
    let existing_task_tags = TaskTagEntity::get_by_task_ids(&db, vec![task.id.clone()]).await?;
    // -- Organize tags based on whether or not they need to be saved or deleted, or just
    // ignore if they
    // already exist.
    let mut tag_values_to_remove: Vec<String> = Vec::new();
    let mut tag_values_to_save: Vec<TaskTagModel> = Vec::new();
    for item_tag in tags.clone() {
        let equation_tag_exists = existing_task_tags
            .iter()
            .any(|x| x.task_id == task.id && x.tag_value == item_tag.tag_value);
        if !equation_tag_exists {
            tag_values_to_save.push(item_tag.clone());
        }
    }
    for existing_tag in &existing_task_tags {
        let tag_should_stay = tags
            .iter()
            .any(|x| x.tag_value == existing_tag.tag_value && existing_tag.task_id == task.id);
        if !tag_should_stay {
            tag_values_to_remove.push(existing_tag.tag_value.to_string());
        }
    }
    // -- Save task tags determined to need to be saved
    TaskTagEntity::create_many(&db, tag_values_to_save.clone()).await?;
    // TaskTagEntity::create_many(&db, tags).await?;

    // -- Make sure tags are saved alongside EquationTags if they do not exist
    let existing_tags = TagEntity::get_by_values(
        &db,
        existing_task_tags
            .iter()
            .map(|x| x.tag_value.clone())
            .collect(),
    )
    .await?;
    let new_tags = tag_values_to_save
        .iter()
        .filter_map(|x| {
            let tag_exists = existing_tags.iter().any(|y| y.value == x.tag_value);
            if tag_exists {
                None
            } else {
                Some(x.tag_value.clone())
            }
        })
        .collect::<Vec<String>>();
    let now = Utc::now().timestamp_millis().to_string();

    if !new_tags.is_empty() {
        TagEntity::save_many(
            &db,
            new_tags
                .iter()
                .map(|x| SharedTaggableModel {
                    value: x.to_string(),
                    utime: now.clone(),
                })
                .collect(),
        )
        .await?;
    }
    // -- Delete TaskTags if determined to be deleted. Tags should not be deleted as they may
    // be used elsewhere.
    if !tag_values_to_remove.is_empty() {
        TaskTagEntity::delete_by_tag_values(&db, tag_values_to_remove, &task.id).await?;
    }
    Ok(())
}
