use chrono::Utc;

pub struct BibEntryModel {
    pub id: String,
    pub user_provided_id: Option<String>,
    /// The json string representing this item's data.
    pub data: String,
    pub ctime: chrono::DateTime<Utc>,
}
