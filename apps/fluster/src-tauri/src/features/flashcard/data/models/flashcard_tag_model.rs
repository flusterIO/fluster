use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct FlashcardTagModel {
    pub flashcard_id: String,
    pub tag_value: String,
}
