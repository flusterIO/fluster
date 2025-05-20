use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Debug, Type, Deserialize, Serialize, Clone, Default, Copy)]
pub enum NoteType {
    #[default]
    Mdx,
    Markdown,
}
