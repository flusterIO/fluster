use fluster_db::entities::mdx_note::mdx_note_summary::MdxNoteSummary;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Serialize, Deserialize, Clone)]
pub struct SummaryListResults {
    pub mdx_notes: Vec<MdxNoteSummary>,
}
