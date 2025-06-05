use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use specta::Type;

/// The SnippetModel is the snippet representation that is passed back and forth across language
/// boundries to get around serialization issues with the SnippetEntity methods.
#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct SnippetModel {
    pub id: Option<String>,
    /// A title or label for the snippet.
    pub label: String,
    /// The code the snippet contains.
    pub body: String,
    /// An optional short description.
    pub desc: Option<String>,
    /// THe language of the snippet.
    pub lang: String,
    /// The time the snippet was created.
    pub ctime: i64,
    /// The time the snippet was last updated.
    pub utime: i64,
}

impl SnippetModel {
    /// Sets the ctime and utime fields to now and returns the created snippet model.
    pub fn new_now(
        label: String,
        body: String,
        lang: String,
        desc: Option<String>,
    ) -> SnippetModel {
        let now = Utc::now().timestamp_millis();
        SnippetModel {
            id: None,
            label,
            body,
            desc,
            lang,
            utime: now,
            ctime: now,
        }
    }
}
