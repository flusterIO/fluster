use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;

/// The search results returned froma  taggable input or via a traditional text based query.
#[derive(Serialize, Deserialize, Type)]
pub struct TraditionalSearchResults {
    pub notes: Vec<MdxNoteGroup>,
}
