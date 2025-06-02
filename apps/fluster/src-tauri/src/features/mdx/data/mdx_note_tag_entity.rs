use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::mdx_note_tag_model::MdxNoteTagModel;

pub struct MdxNoteTagEntity {}

impl DbEntity<MdxNoteTagModel> for MdxNoteTagEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_id", DataType::Utf8, false),
            Field::new("tag_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let tag_id = StringArray::from(vec![item.tag_id.clone()]);
        let mdx_note_id = StringArray::from(vec![item.mdx_note_id.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_note_id), Arc::new(tag_id)]).unwrap()
    }
}
