use serde::{Deserialize, Serialize};
use specta::Type;


#[derive(Serialize, Deserialize, Type)]
pub struct NoteSummary {
    pub title: String,
    pub file_path: String
}


#[derive(Serialize, Deserialize, Type)]
pub struct PaginationProps {
    pub per_page: i32,
    pub page_number: i32,
}

impl Default for PaginationProps {
    fn default() -> Self {
        Self { per_page: 50, page_number: 1 }
    }
}
