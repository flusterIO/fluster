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
    println!("Task tags length: {:?}", tags.len());
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskEntity::save_many(&db, vec![task]).await?;
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
    TaskTagEntity::create_many(&db, tags).await?;
    Ok(())
}
