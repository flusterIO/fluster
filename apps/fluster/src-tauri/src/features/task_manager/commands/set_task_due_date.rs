use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::task_manager::task_entity::TaskEntity,
};

#[derive(Serialize, Deserialize, Type, Clone)]
pub struct TaskDueDateData {
    pub task_id: String,
    pub due_at: String,
}

#[tauri::command]
#[specta::specta]
pub async fn set_task_due_date(props: TaskDueDateData) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mut task_data = TaskEntity::get_by_id(&db, props.task_id).await?;
    task_data.due_at = Some(props.due_at);
    TaskEntity::save_many(&db, vec![task_data]).await?;
    Ok(())
}
