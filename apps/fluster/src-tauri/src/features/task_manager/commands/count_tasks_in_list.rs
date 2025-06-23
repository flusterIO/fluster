use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::task_entity::TaskEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn count_tasks_in_list(id: String) -> FlusterResult<usize> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskEntity::count_by_list_id(&db, &id).await
}
