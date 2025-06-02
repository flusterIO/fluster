use serde::{Deserialize, Serialize};
use specta::Type;

use crate::{
    core::types::{errors::errors::FlusterResult, FlusterDb},
    features::snippets::{snippet_entity::SnippetEntity, snippet_model::SnippetModel},
};

#[derive(Serialize, Deserialize, Type)]
pub struct SnippetTagModel {
    pub tag_id: String,
    pub snippet_id: String,
}

impl SnippetTagModel {
    pub async fn get_snippet(&self, conn: FlusterDb<'_>) -> FlusterResult<SnippetModel> {
        SnippetEntity::get_by_id(self.snippet_id.clone(), conn).await
    }
}
