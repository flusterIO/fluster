use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type)]
pub struct BookmarkModel {
    pub mdx_file_path: String,
    pub id: String,
}
