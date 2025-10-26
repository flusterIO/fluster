use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, specta::Type)]
pub struct FlashcardModel {
    pub id: String,
    pub label: String,
    pub answer: String,
    pub answer_description: String,
    pub question: String,
    pub question_description: String,
    pub correct_count: u32,
    pub incorrect_count: u32,
}
