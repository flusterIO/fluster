use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct Citation {
    pub id: Option<String>,
    pub pdf_path: Option<String>,
    pub read: bool,
}
