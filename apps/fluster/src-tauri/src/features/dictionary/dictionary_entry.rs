use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub struct DictionaryEntry {
    pub label: String,
    pub body: String,
}
