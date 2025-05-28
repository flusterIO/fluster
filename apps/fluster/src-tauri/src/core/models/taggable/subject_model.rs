use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(specta::Type, Deserialize, Serialize, FromRow)]
pub struct Subject {
    pub id: i32,
    pub value: String,
}
