use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct MdxNoteLinkModel {
    pub mdx_note_file_path_from: String,
    pub mdx_user_provided_id_to: String,
}
