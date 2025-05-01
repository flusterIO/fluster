use serde::{Deserialize, Serialize};

use crate::models::{
    nested_models::code::supported_syntax_language::SupportedSyntaxLanguage,
    taggable::tag_model::Tag,
};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Snippet {
    label: String,
    language: SupportedSyntaxLanguage,
    body: String,
    tags: Vec<Tag>,
}
