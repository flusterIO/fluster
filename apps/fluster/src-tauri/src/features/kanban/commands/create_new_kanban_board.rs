use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::kanban::data::{
        kanban_board_entity::KanbanBoardEntity, kanban_board_model::KanbanBoardModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn create_new_kanban_board(item: KanbanBoardModel) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    KanbanBoardEntity::save_many(&db, &[item]).await
}
