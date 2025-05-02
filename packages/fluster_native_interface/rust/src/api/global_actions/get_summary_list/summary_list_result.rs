use serde::{Deserialize, Serialize};

use super::summary_types::mdx_note_summary::MdxNoteSummary;

#[derive(Debug, Default, Serialize, Deserialize, Clone, Copy)]
pub struct SummaryListResults {
    pub mdx_notes: Vec<MdxNoteSummary>,
}
