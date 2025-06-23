use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::{task_entity::TaskEntity, task_tag_entity::TaskTagEntity},
};

#[tauri::command]
#[specta::specta]
pub async fn delete_task_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    TaskEntity::delete_by_id(&db, &id).await?;
    TaskTagEntity::delete(&db, format!("task_id = \"{}\"", id)).await?;
    Ok(())
}
