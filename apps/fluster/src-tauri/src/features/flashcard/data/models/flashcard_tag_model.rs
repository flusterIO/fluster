use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type)]
pub struct FlashcardTagModel {
    pub flashcard_id: String,
    pub tag_value: String,
}
