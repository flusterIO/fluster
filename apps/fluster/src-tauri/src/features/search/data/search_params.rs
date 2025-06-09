use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Deserialize, Serialize, Clone)]
pub enum SearchOrder {
    Created,
}

#[derive(Type, Deserialize, Serialize)]
pub struct SearchParams {
    order: Option<SearchOrder>,
    per_page: Option<i32>,
    page: Option<i32>,
}

impl Default for SearchParams {
    fn default() -> Self {
        Self {
            order: Some(SearchOrder::Created),
            per_page: Some(20),
            page: Some(1),
        }
    }
}
