use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{task_list_entity::TaskListEntity, task_list_model::TaskListModel},
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_task_lists() -> FlusterResult<Vec<TaskListModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskListEntity::get_all(&db).await
}
