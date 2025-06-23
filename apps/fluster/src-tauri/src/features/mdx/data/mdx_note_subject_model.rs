use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteSubjectModel {
    pub mdx_note_file_path: String,
    pub subject_value: String,
}
