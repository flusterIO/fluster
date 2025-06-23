use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{task_list_entity::TaskListEntity, task_list_model::TaskListModel},
};

#[tauri::command]
#[specta::specta]
pub async fn create_task_list(task_list: TaskListModel) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskListEntity::save_many(&db, vec![task_list]).await
}
