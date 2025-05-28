use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Debug, Clone)]
pub struct MdxNote {
    pub id: Option<String>,
    pub raw_body: String,
    pub file_path: Option<String>,
    // Created time
    pub ctime: Option<chrono::NaiveDateTime>,
    // Modified time
    pub mtime: Option<chrono::NaiveDateTime>,
    // Access time
    pub atime: Option<chrono::NaiveDateTime>,
}
