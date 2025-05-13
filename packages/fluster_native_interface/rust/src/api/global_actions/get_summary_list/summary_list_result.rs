use serde::{Deserialize, Serialize};

use crate::api::embedded_ts::MdxNoteSummary;

#[derive(Debug, Default, Serialize, Deserialize, Clone)]
pub struct SummaryListResults {
    pub mdx_notes: Vec<MdxNoteSummary>,
}
