use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;

#[derive(Type, Serialize, Deserialize)]
pub struct SemanticSearchResults {
    pub notes: Vec<MdxNoteGroup>,
}
