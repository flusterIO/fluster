use super::shared_taggable_model::SharedTaggableModel;
use arrow_array::{Date64Array, RecordBatch, TimestampMillisecondArray};
use arrow_schema::{DataType, Field, Schema};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::core::types::traits::db_entity::DbEntity;

#[derive(specta::Type, Deserialize, Serialize, Clone)]
pub struct SubjectEntity {}

impl DbEntity<SharedTaggableModel> for SubjectEntity {
    fn to_record_batch(item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime = TimestampMillisecondArray::from(vec![item.ctime.timestamp_millis()]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, Some("Utc".into())),
                false,
            ),
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
