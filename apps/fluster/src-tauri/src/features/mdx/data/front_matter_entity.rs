use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::front_matter_model::FrontMatterModel;

pub struct FrontMatterEntity {}

impl DbEntity<FrontMatterModel> for FrontMatterEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, false),
            Field::new("title", DataType::Utf8, false),
            Field::new("summary", DataType::Utf8, true),
        ]))
    }

    fn to_record_batch(
        item: &FrontMatterModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let title = StringArray::from(vec![item.title.clone()]);
        let summary = StringArray::from(vec![item.summary.clone()]);
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(user_provided_id),
                Arc::new(title),
                Arc::new(summary),
            ],
        )
        .unwrap()
    }
}
