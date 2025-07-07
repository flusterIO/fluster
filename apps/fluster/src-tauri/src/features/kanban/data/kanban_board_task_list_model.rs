use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type)]
pub struct KanbanBoardTaskListModel {
    /// The id field of the KanbanBoardEntryModel.
    pub kanban_board_entry_id: String,
    /// The id field of the related TaskListModel.
    pub task_list_id: String
}
