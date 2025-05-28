use serde::{Deserialize, Serialize};
use specta::Type;
use sqlx::prelude::FromRow;

#[derive(Type, Serialize, Deserialize, FromRow, Debug)]
pub struct SnippetItem {
    pub id: Option<i32>,
    pub label: String,
    pub body: String,
    #[sqlx(rename = "description")]
    pub desc: String,
    pub lang: String,
}
