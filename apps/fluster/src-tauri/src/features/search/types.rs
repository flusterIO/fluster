use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type)]
pub struct NoteSummary {
    pub title: String,
    pub file_path: String,
}

#[derive(Serialize, Deserialize, Type)]
pub struct PaginationProps {
    pub per_page: usize,
    pub page_number: usize,
}

impl PaginationProps {
    pub fn take_all() -> Self {
        Self {
            per_page: 999999,
            page_number: 1,
        }
    }
}

impl Default for PaginationProps {
    fn default() -> Self {
        Self {
            per_page: 50,
            page_number: 1,
        }
    }
}
