use serde::{Deserialize, Serialize};
use std::sync::Arc;

use arrow_array::{Int64Array, RecordBatch};
use arrow_schema::{DataType, Field, Schema};
use chrono::prelude::*;

#[derive(specta::Type, Deserialize, Serialize, Clone)]
pub struct Topic {
    pub value: String,
    pub ctime: i64,
}

impl Topic {
    pub fn new(val: &str) -> Topic {
        Topic {
            value: val.to_string(),
            ctime: Utc::now().timestamp_millis(),
        }
    }
    pub fn to_record_batch(&self, schema: Arc<Schema>) -> RecordBatch {
        let ctime = Int64Array::from(vec![self.ctime]);
        let text_array = arrow_array::StringArray::from(vec![self.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    pub fn arrow_schema() -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new("ctime", DataType::Date64, false),
            // Field::new(
            //     "vector",
            //     DataType::FixedSizeList(
            //         Arc::new(Field::new("item", DataType::Float32, true)),
            //         vector_dim,
            //     ),
            //     true, // Vectors can be nullable if you intend to have some entries without embeddings
            // ),
        ]))
    }
}
