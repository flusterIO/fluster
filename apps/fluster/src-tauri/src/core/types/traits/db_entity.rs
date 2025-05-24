use serde::{Deserialize, Serialize};
use specta::Type;
use sqlx::prelude::FromRow;

#[derive(Deserialize, Type, Serialize, FromRow)]
pub struct DbRecord {
    pub id: i32,
}
