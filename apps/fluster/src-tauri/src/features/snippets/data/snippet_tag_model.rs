use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
pub struct SnippetTagModel {
    pub snippet_id: String,
    pub tag_value: String,
}
