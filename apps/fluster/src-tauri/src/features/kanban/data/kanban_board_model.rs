use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Clone)]
pub struct KanbanBoardModel {
    pub id: String,
    pub label: String,
    pub desc: Option<String>,
}
