use serde::{Deserialize, Serialize};
use specta::Type;
use sqlx::prelude::FromRow;

use crate::core::types::errors::errors::FlusterResult;

use super::tag_model::Tag;

#[derive(Serialize, Deserialize, Type, FromRow)]
pub struct TagSnippetJoin {
    pub tag_id: i32,
    pub snippet_id: i32,
}

impl TagSnippetJoin {
    pub fn get_tag() -> FlusterResult<Tag> {
        Err(crate::core::types::errors::errors::FlusterError::NotImplemented)
    }
}
