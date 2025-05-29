use std::sync::Arc;

use arrow_array::{
    types::Float32Type, ArrayRef, FixedSizeListArray, Float32Array, Int32Array, Int64Array,
    RecordBatch,
};
use arrow_schema::{DataType, Field, Schema};
use chrono::prelude::*;
use sea_query::Iden;
use serde::{Deserialize, Serialize};

use crate::core::db::tables::shared_taggable_schema::get_shared_taggable_schema;

#[derive(specta::Type, Deserialize, Serialize)]
pub struct Tag {
    pub value: String,
    pub ctime: i64,
    pub vector: Vec<f32>,
}

impl Tag {
    pub fn new(val: &str) -> Tag {
        Tag {
            value: val.to_string(),
            vector: Vec::new(),
            ctime: Utc::now().timestamp_millis(),
        }
    }
    pub fn to_record_batch(&self, schema: Arc<Schema>) -> RecordBatch {
        let ctime = Int64Array::from(vec![self.ctime]);
        let text_array = arrow_array::StringArray::from(vec![self.value.clone()]);

        let vector_data = FixedSizeListArray::from_iter_primitive::<Float32Type, _, _>(
            vec![Some(
                self.vector.iter().map(|&f| Some(f)).collect::<Vec<_>>(),
            )],
            self.vector.len() as i32, // This is the list_size argument, the dimension of your vector
        );
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![Arc::new(text_array), Arc::new(ctime), Arc::new(vector_data)],
        )
        .unwrap()
    }
    pub fn arrow_schema(vector_dim: i32) -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new("ctime", DataType::Date64, false),
            Field::new(
                "vector",
                DataType::FixedSizeList(
                    Arc::new(Field::new("item", DataType::Float32, true)),
                    vector_dim,
                ),
                true, // Vectors can be nullable if you intend to have some entries without embeddings
            ),
        ]))
    }
}

#[cfg(test)]
mod tests {
    use crate::core::db::{db::get_database, tables::table_paths::DatabaseTables};

    use super::*;

    #[tokio::test]
    async fn saves_tag() {
        let test_tag = Tag::new("test tag");
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let tbl = db
            .open_table(DatabaseTables::Tags.to_string())
            .execute()
            .await
            .expect("Opens tag table without throwing an error.");
        tbl.add(test_tag.arrow_schema())
            .execute()
            .await
            .expect("Saves tag without throwing an error.");
    }
}
