use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct MdxNoteEquationModel {
    pub mdx_note_file_path: String,
    /// Points to the 'equation_id' field. Note the auto-generated id.
    pub equation_id: String,
}
