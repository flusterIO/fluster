use arrow_array::{Date64Array, RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};
use std::sync::Arc;

use crate::core::types::traits::db_entity::DbEntity;

use super::equation_model::EquationModel;

/// Note that despite snippets being bound to this the model for convenience, they must be saved
/// and read seperately.
pub struct EquationEntity {}

impl DbEntity<EquationModel> for EquationEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new("desc", DataType::Utf8, true),
            Field::new("ctime", DataType::Date64, false),
            Field::new("utime", DataType::Date64, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let label = arrow_array::StringArray::from(vec![item.label.clone()]);
        let body = arrow_array::StringArray::from(vec![item.body.clone()]);
        let desc = arrow_array::StringArray::from(vec![item.desc.clone()]);
        let ctime = Date64Array::from(vec![item.ctime.timestamp_millis()]);
        let utime = Date64Array::from(vec![item.utime.timestamp_millis()]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(equation_id),
                Arc::new(label),
                Arc::new(body),
                Arc::new(desc),
                Arc::new(ctime),
                Arc::new(utime),
            ],
        )
        .unwrap()
    }
}
