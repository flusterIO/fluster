use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::mdx::data::mdx_note_group::MdxNoteGroup;

#[derive(Serialize, Deserialize, Type)]
pub struct TaggableSearchResults {
    pub notes: Vec<MdxNoteGroup>,
}
