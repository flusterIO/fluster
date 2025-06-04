use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone)]
pub struct MdxNoteModel {
    /// create a new model. This file_path becomes essentially the primary key.
    pub file_path: String,
    pub raw_body: String,
    /// file_path was moved to a required field. When we incorporate remote files we'll just
    pub front_matter_id: String,
    // Created time in milliseconds.
    pub ctime: i64,
    /// This field is updated each time a note is accessed in milliseconds.
    pub last_read: i64,
}
