use chrono::Utc;
use regex::Regex;

pub struct BibEntryModel {
    pub id: String,
    pub user_provided_id: Option<String>,
    /// The json string representing this item's data.
    pub data: String,
    pub ctime: chrono::DateTime<Utc>,
}

impl BibEntryModel {
    pub fn get_regex() -> Regex {
        return Regex::new(r#"\[\[cite:(?<citation_Id>[^\]]+)\]\]"#)
            .expect("Creates regex without throwing an error.");
    }
}
