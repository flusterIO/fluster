use crate::{
    core::{
        database::db::get_database, models::taggable::tag_entity::TagEntity,
        types::errors::errors::FlusterResult,
    },
    features::task_manager::{
        task_entity::TaskEntity,
        task_model::{TaskModel, TaskModelWithTags},
        task_tag_entity::TaskTagEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_task_by_id(id: String) -> FlusterResult<TaskModelWithTags> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let task = TaskEntity::get_by_id(&db, id).await?;
    let all_task_tags = TaskTagEntity::get_by_task_ids(&db, vec![task.id.clone()]).await?;
    let all_tags = TagEntity::get_by_values(
        &db,
        all_task_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    let mut tags = Vec::new();

    for task_tag in all_task_tags.clone() {
        if task_tag.task_id == task.id {
            if let Some(tag) = all_tags.iter().find(|x| x.value == task_tag.tag_value) {
                tags.push(tag.clone())
            }
        }
    }
    return Ok(TaskModelWithTags {
        tags,
        id: task.id,
        notes: task.notes,
        label: task.label,
        task_list_id: task.task_list_id,
        ctime: task.ctime,
        due_at: task.due_at,
        complete: task.complete,
    });
}
