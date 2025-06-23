use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteBibEntryModel {
    pub mdx_note_file_path: String,
    pub bib_entry_id: String,
}
