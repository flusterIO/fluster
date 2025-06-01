use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Debug, Serialize, Deserialize)]
pub struct GetSnippetsParams {
    pub langs: Option<Vec<String>>,
}
