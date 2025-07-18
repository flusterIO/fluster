use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{
        task_entity::TaskEntity, task_list_entity::TaskListEntity, task_list_model::TaskListModel,
        task_model::TaskModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_incomplete_tasks_with_due_date() -> FlusterResult<Vec<TaskModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let items = TaskEntity::get_incomplete_with_due_date(&db).await?;
    Ok(items)
}
