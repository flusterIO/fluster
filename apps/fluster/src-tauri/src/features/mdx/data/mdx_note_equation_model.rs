use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteEquationModel {
    pub mdx_note_file_path: String,
    /// Points to the 'id' field. Note the user provided id.
    pub equation_id: String,
}
