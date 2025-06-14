use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use std::sync::Arc;

use crate::core::{
    database::{
        db::{clean_table, get_table},
        tables::table_paths::DatabaseTables,
    },
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::mdx_note_model::MdxNoteModel;

pub struct MdxNoteEntity {}

impl MdxNoteEntity {
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::MdxNote).await
    }
    pub async fn save_many(items: Vec<MdxNoteModel>, db: &FlusterDb<'_>) -> FlusterResult<()> {
        let schema = MdxNoteEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::MdxNote).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(MdxNoteEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&str] = &["file_path"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                log::error!("Error: {:?}", e);
                println!("Error: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        Ok(())
    }
}

impl DbEntity<MdxNoteModel> for MdxNoteEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("file_path", DataType::Utf8, true),
            Field::new("raw_body", DataType::Utf8, false),
            Field::new("front_matter_id", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
            Field::new(
                "last_read",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let raw_body = StringArray::from(vec![item.raw_body.clone()]);
        let file_path = StringArray::from(vec![item.file_path.clone()]);
        let front_matter_id = StringArray::from(vec![item.file_path.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let last_read_value: i64 = item.last_read.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let last_read = TimestampMillisecondArray::from(vec![last_read_value]);
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(file_path),
                Arc::new(raw_body),
                Arc::new(front_matter_id),
                Arc::new(ctime),
                Arc::new(last_read),
            ],
        )
        .unwrap()
    }
}
