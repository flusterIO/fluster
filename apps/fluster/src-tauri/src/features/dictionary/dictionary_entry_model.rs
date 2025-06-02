use chrono::Utc;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub struct DictionaryEntryModel {
    pub label: String,
    pub body: String,
    pub ctime: i64,
}
