use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{
        database::db::get_database, models::taggable::tag_entity::TagEntity,
        types::errors::errors::FlusterResult,
    },
    features::task_manager::{
        task_list_entity::TaskListEntity,
        task_list_model::TaskListModel,
        task_model::{TaskModel, TaskModelWithTags},
        task_tag_entity::TaskTagEntity,
    },
};

#[derive(Serialize, Deserialize, Type)]
pub struct TaskListData {
    list: TaskListModel,
    items: Vec<TaskModelWithTags>,
}

/// Accepts the list.id field and a vec of tasks associated with this list. This is required to get
/// around the date parsing issue in Rust.
#[tauri::command]
#[specta::specta]
pub async fn get_task_list_data(
    list_id: String,
    list_tasks: Vec<TaskModel>,
) -> FlusterResult<TaskListData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let list = TaskListEntity::get_by_id(&db, &list_id).await?;
    let tasks = list_tasks;
    let all_task_tags =
        TaskTagEntity::get_by_task_ids(&db, tasks.iter().map(|x| x.id.clone()).collect()).await?;
    let all_tags = TagEntity::get_by_values(
        &db,
        all_task_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    let mut items: Vec<TaskModelWithTags> = Vec::new();
    for task in tasks {
        let mut tags = Vec::new();
        for task_tag in all_task_tags.clone() {
            if task_tag.task_id == task.id {
                if let Some(tag) = all_tags.iter().find(|x| x.value == task_tag.tag_value) {
                    tags.push(tag.clone())
                }
            }
        }
        items.push(TaskModelWithTags {
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
    Ok(TaskListData { list, items })
}
