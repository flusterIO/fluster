use serde::{Deserialize, Serialize};

use crate::{
    core::models::taggable::shared_taggable_model::SharedTaggableModel,
    features::flashcard::data::models::{
        flashcard_subject_model::FlashcardSubjectModel, flashcard_tag_model::FlashcardTagModel,
        flashcard_topic_model::FlashcardTopicModel,
    },
};

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

#[derive(Debug, Clone, Serialize, Deserialize, specta::Type)]
pub struct FlashcardGroup {
    pub id: String,
    pub label: String,
    pub answer: String,
    pub answer_description: String,
    pub question: String,
    pub question_description: String,
    pub correct_count: u32,
    pub incorrect_count: u32,
    pub tags: Vec<FlashcardTagModel>,
    pub topic: Option<FlashcardTopicModel>,
    pub subject: Option<FlashcardSubjectModel>,
}
