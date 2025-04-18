use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct MdxNote {
    pub id: Option<surrealdb::sql::Thing>,
    pub path: String,
    pub content: String,
    pub title: String,
    // pub matter: FrontMatter,
}
