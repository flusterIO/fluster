use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::kanban::data::kanban_board_entity::KanbanBoardEntity,
};

#[tauri::command]
#[specta::specta]
pub async fn delete_kanban_board_by_id(id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    KanbanBoardEntity::delete_by_id(&db, &id).await
}
