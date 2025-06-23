use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteTopicModel {
    pub mdx_note_file_path: String,
    pub topic_value: String,
}
