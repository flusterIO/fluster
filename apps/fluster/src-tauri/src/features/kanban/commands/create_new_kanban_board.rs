use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        mdx::data::{mdx_note_entity::MdxNoteEntity, mdx_note_group::MdxNoteGroup},
        search::types::PaginationProps,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn create_new_kanban_board(
    item: KanbanBoardModel,
) -> FlusterResult<Vec<MdxNoteGroup>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
}
