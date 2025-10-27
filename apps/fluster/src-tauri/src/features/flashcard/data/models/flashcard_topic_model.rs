use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct FlashcardTopicModel {
    pub flashcard_id: String,
    pub topic_value: String,
}
