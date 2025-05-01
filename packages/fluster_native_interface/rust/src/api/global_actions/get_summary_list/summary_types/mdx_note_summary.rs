pub use fluster_models::models::notes::front_matter::front_matter_model::FrontMatter;
use serde::{Deserialize, Serialize};
pub use surrealdb::sql::Thing;

#[derive(Debug, Serialize, Deserialize)]
pub struct MdxNoteSummary {
    pub front_matter: FrontMatter,
    pub id: Thing,
}
