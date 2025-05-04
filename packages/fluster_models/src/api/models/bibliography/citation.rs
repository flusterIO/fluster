use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BibEntryEntity {
    pub id: Option<String>,
    pub pdf_path: Option<String>,
    pub read: bool,
    /// This is the stringified json of the objects fields.
    /// The 'label/key' field is seperate, as that should always exst.
    // pub entry: BibtexEntry,
    pub fields: String,
}
