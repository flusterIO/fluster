use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::mdx_note_equation_model::MdxNoteEquationModel;

pub struct MdxNoteEquationEntity {}

impl DbEntity<MdxNoteEquationModel> for MdxNoteEquationEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_id", DataType::Utf8, false),
            Field::new("equation_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteEquationModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_id = StringArray::from(vec![item.mdx_note_id.clone()]);
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_note_id), Arc::new(equation_id)]).unwrap()
    }
}
