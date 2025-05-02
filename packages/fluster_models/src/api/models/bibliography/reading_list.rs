use serde::{Deserialize, Serialize};

use crate::models::nested_models::fluster_datetime::fluster_time::FlusterTime;

use super::citation::Citation;

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct ReadingList {
    pub id: Option<String>,
    pub label: String,
    pub papers: Vec<Citation>,
    /// Created time.
    pub ctime: FlusterTime,
}
