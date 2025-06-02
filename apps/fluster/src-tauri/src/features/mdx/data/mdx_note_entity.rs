use arrow_array::{Date64Array, RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};
use chrono::prelude::*;
use std::sync::Arc;

use crate::core::types::traits::db_entity::DbEntity;

use super::mdx_note_model::MdxNoteModel;

pub struct MdxNoteEntity {}

impl DbEntity<MdxNoteModel> for MdxNoteEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("raw_body", DataType::Utf8, false),
            Field::new("file_path", DataType::Utf8, true),
            Field::new("front_matter_id", DataType::Utf8, false),
            Field::new("ctime", DataType::Date64, false),
            Field::new("last_read", DataType::Date64, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let now = Utc::now();
        let id = StringArray::from(vec![item.id.clone()]);
        let raw_body = StringArray::from(vec![item.raw_body.clone()]);
        let file_path = StringArray::from(vec![item.file_path.clone()]);
        let front_matter_id = StringArray::from(vec![item.file_path.clone()]);
        let ctime = Date64Array::from(vec![item.ctime.unwrap_or(now).timestamp_millis()]);
        let last_read = Date64Array::from(vec![item.last_read.unwrap_or(now).timestamp_millis()]);
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(raw_body),
                Arc::new(file_path),
                Arc::new(front_matter_id),
                Arc::new(ctime),
                Arc::new(last_read),
            ],
        )
        .unwrap()
    }
}
