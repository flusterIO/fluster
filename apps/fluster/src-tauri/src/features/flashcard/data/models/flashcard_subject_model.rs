use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Clone, Type, Debug)]
pub struct FlashcardSubjectModel {
    pub flashcard_id: String,
    pub subject_value: String,
}
