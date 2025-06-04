use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteSnippetModel {
    pub mdx_note_id: String,
    /// Points to the 'id' field. Note the user provided id.
    pub snippet_id: String,
}
