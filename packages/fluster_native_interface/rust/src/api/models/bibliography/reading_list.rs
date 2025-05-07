use serde::{Deserialize, Serialize};

use crate::api::models::nested_models::fluster_datetime::fluster_time::FlusterTime;

use super::citation::BibEntryEntity;

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct ReadingList {
    pub id: Option<String>,
    pub label: String,
    pub papers: Vec<BibEntryEntity>,
    /// Created time.
    pub created_at: FlusterTime,
}
