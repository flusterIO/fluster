use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::snippets::data::snippet_tag_model::SnippetTagModel;

/// The SnippetModel is the snippet representation that is passed back and forth across language
/// boundries to get around serialization issues with the SnippetEntity methods.
#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct SnippetModel {
    pub id: String,
    /// A title or label for the snippet.
    pub label: String,
    /// The code the snippet contains.
    pub body: String,
    /// An optional short description.
    pub desc: Option<String>,
    /// THe language of the snippet.
    pub lang: String,
    /// The time the snippet was created.
    pub ctime: String,
    /// The time the snippet was last updated.
    pub utime: String,
}

#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct SnippetData {
    pub snippet: SnippetModel,
    pub tags: Vec<SnippetTagModel>,
}
