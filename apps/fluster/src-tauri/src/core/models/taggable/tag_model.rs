use std::sync::Arc;

use arrow_array::{
    types::Float32Type, ArrayRef, FixedSizeListArray, Float32Array, Int32Array, Int64Array,
    RecordBatch,
};
use arrow_schema::{DataType, Field, Schema};
use chrono::prelude::*;
use sea_query::Iden;
use serde::{Deserialize, Serialize};

#[derive(specta::Type, Deserialize, Serialize, Clone)]
pub struct Tag {
    pub value: String,
    pub ctime: i64,
}

impl Tag {
    pub fn new(val: &str) -> Tag {
        Tag {
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
    pub fn arrow_schema(vector_dim: i32) -> Arc<Schema> {
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

#[cfg(test)]
mod tests {
    use arrow_array::{RecordBatchIterator, RecordBatchReader};

    use crate::core::db::{db::get_database, tables::table_paths::DatabaseTables};

    use super::*;

    #[tokio::test]
    async fn saves_tag() {
        let test_tag = Tag::new("test tag");
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let schema = Tag::arrow_schema(1);
        let tbl = db
            .open_table(DatabaseTables::Tags.to_string())
            .execute()
            .await
            .expect("Opens tag table without throwing an error.");
        let initial_batches = vec![Ok(test_tag.to_record_batch(schema.clone()))];
        let stream = Box::new(RecordBatchIterator::new(
            initial_batches.into_iter(),
            schema.clone(),
        )) as Box<dyn RecordBatchReader + Send>;
        tbl.add(stream)
            .execute()
            .await
            .expect("Saves tag without throwing an error.");
    }
}
