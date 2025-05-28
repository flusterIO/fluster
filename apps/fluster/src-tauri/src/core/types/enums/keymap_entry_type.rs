use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum KeymapEntryType {
    Global,
    CommandPaletteInput,
}
