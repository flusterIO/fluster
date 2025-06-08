use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone)]
pub struct MdxNoteModel {
    /// create a new model. This file_path becomes essentially the primary key.
    pub file_path: String,
    pub raw_body: String,
    // Created time in milliseconds.
    pub ctime: String,
    /// This field is updated each time a note is accessed in milliseconds.
    pub last_read: String,
}
