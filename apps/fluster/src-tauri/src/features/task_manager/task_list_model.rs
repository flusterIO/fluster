use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize, Clone)]
pub struct TaskListModel {
    pub id: String,
    pub label: String,
    pub desc: Option<String>,
    pub ctime: String,
}
