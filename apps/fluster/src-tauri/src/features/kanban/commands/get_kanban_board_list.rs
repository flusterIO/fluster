use serde::{Deserialize, Serialize};

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::{
        kanban::data::{
            kanban_board_entity::KanbanBoardEntity, kanban_board_model::KanbanBoardModel,
        },
        search::types::PaginationProps,
    },
};

#[derive(Serialize, Deserialize, specta::Type)]
pub struct KanbanBoardListData {
    boards: Vec<KanbanBoardModel>,
}

#[tauri::command]
#[specta::specta]
pub async fn get_kanban_board_list(
    predicate: Option<String>,
    pagination: Option<PaginationProps>,
) -> FlusterResult<KanbanBoardListData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let board_res = KanbanBoardEntity::get_many(
        &db,
        &predicate,
        &pagination.unwrap_or(PaginationProps::take_all()),
    )
    .await?;
    Ok(KanbanBoardListData { boards: board_res })
}
