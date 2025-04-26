use serde::{Deserialize, Serialize};

use crate::models::notes::taggable::taggable_model::Taggable;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct FrontMatter {
    title: Option<String>,
    summary: Option<String>,
    tags: Vec<Taggable>,
}

impl Default for FrontMatter {
    fn default() -> Self {
        Self {
            title: Default::default(),
            summary: Default::default(),
            tags: Default::default(),
        }
    }
}
