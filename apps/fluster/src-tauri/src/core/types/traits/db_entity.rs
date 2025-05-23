use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Deserialize, Type, Serialize)]
pub struct DbRecord {
    pub id: String,
}
