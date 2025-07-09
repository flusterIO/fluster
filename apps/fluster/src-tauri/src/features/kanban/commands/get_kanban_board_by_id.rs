use std::ops::Index;

use serde::{Deserialize, Serialize};

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::kanban::data::{
        kanban_board_entity::KanbanBoardEntity, kanban_board_model::KanbanBoardModel,
    },
};

#[derive(Serialize, Deserialize, specta::Type)]
pub struct KanbanBoardData {
    board: KanbanBoardModel,
}

#[tauri::command]
#[specta::specta]
pub async fn get_kanban_board_by_id(id: String) -> FlusterResult<KanbanBoardData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let board_res = KanbanBoardEntity::get_by_ids(&db, vec![id]).await?;
    let l = board_res.len();
    if l == 0 {
        return Err(FlusterError::FailToFind);
    } else if l > 1 {
        return Err(FlusterError::DuplicateId);
    }
    Ok(KanbanBoardData {
        board: board_res.index(0).clone(),
    })
}
