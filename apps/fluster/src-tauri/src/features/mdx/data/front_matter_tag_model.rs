use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct FrontMatterTagModel {
    pub mdx_note_file_path: String,
    pub tag_value: String,
}
