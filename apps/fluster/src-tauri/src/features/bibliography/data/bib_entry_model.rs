use regex::Regex;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Clone, Debug)]
pub struct BibEntryModel {
    pub id: String,
    pub user_provided_id: Option<String>,
    /// The json string representing this item's data.
    pub data: String,
    pub ctime: String,
    pub html_citation: String,
    pub pdf_path: Option<String>,
}

impl BibEntryModel {
    pub fn get_regex() -> Regex {
        Regex::new(r#"\[\[cite:(?<citation_id>[^\]]+)\]\]"#)
            .expect("Creates regex without throwing an error.")
    }
}
