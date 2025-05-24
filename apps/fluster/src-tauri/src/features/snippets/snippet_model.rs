use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub struct SnippetItem {
    pub id: Option<i32>,
    pub label: String,
    pub body: String,
    pub desc: String,
    pub lang: String,
}
