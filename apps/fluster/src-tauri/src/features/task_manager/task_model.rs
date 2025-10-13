use serde::{Deserialize, Serialize};
use specta::Type;

use crate::core::models::taggable::shared_taggable_model::SharedTaggableModel;

#[derive(Type, Deserialize, Serialize, Clone, Debug)]
pub struct TaskModel {
    pub id: String,
    /// The id of the parent task list.
    pub task_list_id: String,
    pub label: String,
    /// notes can be any mdx string.
    pub notes: String,
    /// The optional due date for the task.
    pub due_at: Option<String>,
    /// Time the task was created.
    pub ctime: String,
    pub complete: bool,
}

#[derive(Type, Deserialize, Serialize, Clone)]
pub struct TaskModelWithTags {
    pub id: String,
    /// The id of the parent task list.
    pub task_list_id: String,
    pub label: String,
    /// notes can be any mdx string.
    pub notes: String,
    /// The optional due date for the task.
    pub due_at: Option<String>,
    /// Time the task was created.
    pub ctime: String,
    pub complete: bool,
    pub tags: Vec<SharedTaggableModel>,
}
