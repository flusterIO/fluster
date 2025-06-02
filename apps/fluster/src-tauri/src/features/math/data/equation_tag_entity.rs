use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::equation_tag_model::EquationTagModel;

pub struct EquationTagEntity {}

impl DbEntity<EquationTagModel> for EquationTagEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("tag_value", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let tag_value = StringArray::from(vec![item.tag_value.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(equation_id), Arc::new(tag_value)]).unwrap()
    }
}
