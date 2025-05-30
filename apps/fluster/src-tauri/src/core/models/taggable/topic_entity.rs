use std::sync::Arc;

use arrow_array::{Date64Array, RecordBatch};
use arrow_schema::{DataType, Field, Schema};

use super::shared_taggable_model::SharedTaggableModel;
use crate::core::types::traits::db_entity::DbEntity;

#[derive(Clone)]
pub struct TopicEntity {}

impl DbEntity<SharedTaggableModel> for TopicEntity {
    fn to_record_batch(&self, item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime = Date64Array::from(vec![item.ctime.timestamp_millis()]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
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
