use arrow_array::{ArrayRef, FixedSizeListArray, Float32Array, Int32Array, RecordBatch};
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::core::db::tables::shared_taggable_schema::get_shared_taggable_schema;

#[derive(specta::Type, Deserialize, Serialize)]
pub struct Tag {
    pub id: i32,
    pub value: String,
    pub vector: Vec<i32>,
}

impl Tag {
    fn to_record_batch(&self) -> RecordBatch {
        return (self.id, self.value.clone());
    }
    pub fn to_record_batch(&self, schema: Arc<Schema>) -> RecordBatch {
        let id_array = Int32Array::from(vec![self.id]);
        let text_array = arrow_array::StringArray::from(vec![self.text.clone()]);

        // Create the vector array
        let vector_data = FixedSizeListArray::from_iter_primitive::<Float32Array, _, _>(
            vec![Some(
                self.vector.iter().map(|&f| Some(f)).collect::<Vec<_>>(),
            )],
            self.vector.len() as i32,
        );

        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id_array),
                Arc::new(text_array),
                Arc::new(vector_data),
            ],
        )
        .unwrap()
    }
    pub fn arrow_schema(vector_dim: i32) -> Arc<Schema> {
        get_shared_taggable_schema()
    }
}

#[cfg(test)]
mod tests {
    use crate::core::db::{db::get_database, tables::table_paths::DatabaseTables};

    use super::*;

    #[tokio::test]
    async fn saves_tag() {
        let test_tag = Tag {
            id: 1,
            value: "test tag".to_string(),
        };
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let tbl = db
            .open_table(DatabaseTables::Tags.to_string())
            .execute()
            .await
            .expect("Opens tag table without throwing an error.");
        tbl.add(test_tag.to_table_row())
    }
}
