use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct SummaryListQuery {
    pub mdx_per_page: u16,
    pub mdx_page: u16,
}

impl Default for SummaryListQuery {
    fn default() -> Self {
        Self {
            mdx_per_page: 20,
            mdx_page: 1,
        }
    }
}
