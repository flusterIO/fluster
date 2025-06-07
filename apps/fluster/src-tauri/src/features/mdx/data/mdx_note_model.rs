use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone)]
pub struct MdxNoteModel {
    /// create a new model. This file_path becomes essentially the primary key.
    pub file_path: String,
    pub raw_body: String,
    // Created time in milliseconds.
    #[serde(with = "crate::core::utils::stringify_i64::string")]
    pub ctime: i64,
    /// This field is updated each time a note is accessed in milliseconds.
    #[serde(with = "crate::core::utils::stringify_i64::string")]
    pub last_read: i64,
}
