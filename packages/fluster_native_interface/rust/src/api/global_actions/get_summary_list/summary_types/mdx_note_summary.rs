use serde::{Deserialize, Serialize};
pub use surrealdb::sql::Thing;

#[derive(Debug, Serialize, Deserialize)]
pub struct MdxNoteSummary {
    pub title: String,
    pub summary: Option<String>,
    pub id: Thing,
}
