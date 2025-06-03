use std::sync::Arc;

use arrow_array::{RecordBatch, StringArray};
use arrow_schema::{DataType, Field, Schema};

use crate::core::types::traits::db_entity::DbEntity;

use super::task_model::TaskModel;

pub struct TaskEntity {}

impl DbEntity<TaskModel> for TaskEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("notes", DataType::Utf8, false),
            Field::new(
                "flags",
                DataType::List(Arc::new(Field::new("item", DataType::Utf8, false))),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &TaskModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let notes = StringArray::from(vec![item.notes.clone()]);
        // WARN: This flags field might not work. The 'StringArray' field might need to be
        // changed for a different field since this field is an array itself.
        let flags = StringArray::from(item.flags.clone());
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(label),
                Arc::new(notes),
                Arc::new(flags),
            ],
        )
        .unwrap()
    }
}
