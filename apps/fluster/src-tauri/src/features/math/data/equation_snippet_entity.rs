use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::equation_snippet_model::EquationSnippetModel;

pub struct EquationSnippetEntity {}

impl DbEntity<EquationSnippetModel> for EquationSnippetEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("snippet_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationSnippetModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let snippet_id = StringArray::from(vec![item.snippet_id.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(equation_id), Arc::new(snippet_id)]).unwrap()
    }
}
