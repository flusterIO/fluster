use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::kanban::data::{
        kanban_board_entry_entity::KanbanBoardEntryEntity,
        kanban_board_entry_model::KanbanCardModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn create_new_kanban_board_card(item: KanbanCardModel) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    KanbanBoardEntryEntity::save_many(&db, &vec![item]).await
}
