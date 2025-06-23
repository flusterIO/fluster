use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{
        task_entity::TaskEntity, task_list_entity::TaskListEntity, task_list_model::TaskListModel,
        task_model::TaskModel,
    },
};

#[derive(Serialize, Deserialize, Type)]
pub struct TaskListData {
    list: TaskListModel,
    items: Vec<TaskModel>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_task_list_data(list_id: String) -> FlusterResult<TaskListData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let list = TaskListEntity::get_by_id(&db, &list_id).await?;
    let items = TaskEntity::get_by_list_id(&db, list_id).await?;
    Ok(TaskListData { list, items })
}
