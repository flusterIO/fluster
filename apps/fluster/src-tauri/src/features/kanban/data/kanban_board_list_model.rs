use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type)]
pub struct KanbanBoardListModel {
    pub id: String,
    pub label: String,
    pub desc: Option<String>,
    /// The id field of the KanbanBoardModel struct that contains this list.
    pub board_id: String,
}
