use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::mdx_note_snippet_model::MdxNoteSnippetModel;

pub struct MdxNoteSnippetEntity {}

impl DbEntity<MdxNoteSnippetModel> for MdxNoteSnippetEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_id", DataType::Utf8, false),
            Field::new("snippet_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteSnippetModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_id = StringArray::from(vec![item.mdx_note_id.clone()]);
        let snippet_id = StringArray::from(vec![item.snippet_id.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_note_id), Arc::new(snippet_id)]).unwrap()
    }
}
