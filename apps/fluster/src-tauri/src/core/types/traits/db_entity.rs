use arrow_array::RecordBatch;
use arrow_schema::Schema;
use serde::{Deserialize, Serialize};
use specta::Type;
use std::sync::Arc;

#[derive(Deserialize, Type, Serialize)]
pub struct DbRecord {
    pub id: i32,
}

pub trait DbEntity<T> {
    fn arrow_schema() -> Arc<Schema>;
    fn to_record_batch(item: &T, schema: Arc<Schema>) -> RecordBatch;
}

pub type FlusterDateTime = chrono::DateTime<chrono::Utc>;
