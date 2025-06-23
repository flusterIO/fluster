use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct MdxNoteDictionaryEntryModel {
    pub mdx_note_file_path: String,
    pub dictionary_entry_label: String,
}
