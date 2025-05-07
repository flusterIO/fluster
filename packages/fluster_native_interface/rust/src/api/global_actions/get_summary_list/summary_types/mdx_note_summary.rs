pub use crate::api::models::notes::front_matter::front_matter_model::FrontMatterEntity;
use serde::{Deserialize, Serialize};
pub use surrealdb::sql::Thing;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MdxNoteSummary {
    pub front_matter: FrontMatterEntity,
    pub id: Thing,
}
