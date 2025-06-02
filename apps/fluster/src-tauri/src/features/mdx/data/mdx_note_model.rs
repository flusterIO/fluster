use chrono::Utc;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone)]
pub struct MdxNoteModel {
    pub id: String,
    pub raw_body: String,
    pub file_path: Option<String>,
    pub front_matter_id: String,
    // Created time
    pub ctime: Option<chrono::DateTime<Utc>>,
    /// This field is updated each time a note is accessed.
    pub last_read: Option<chrono::DateTime<Utc>>,
}
