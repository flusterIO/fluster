use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type)]
pub struct KanbanBoardEntryModel {
    pub id: String,
    pub label: String,
    pub desc: Option<String>,
    pub body: Option<String>,
    /// The id field of the KanbanBoardListModel that contains this entry.
    pub list_id: String,
}
