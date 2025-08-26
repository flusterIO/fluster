use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{task_entity::TaskEntity, task_model::TaskModel},
};

#[tauri::command]
#[specta::specta]
pub async fn get_task_list_tasks(task_list_id: String) -> FlusterResult<Vec<TaskModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskEntity::get_by_list_id(&db, task_list_id).await
}
