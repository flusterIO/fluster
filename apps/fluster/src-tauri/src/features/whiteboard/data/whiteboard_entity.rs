use std::{ops::Index, sync::Arc};

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::whiteboard_model::WhiteboardModel;

pub struct WhiteboardEntity {}

impl WhiteboardEntity {
    pub fn table() -> DatabaseTables {
        DatabaseTables::Whiteboard
    }
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<()> {
        let tbl = get_table(db, WhiteboardEntity::table()).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;
        Ok(())
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<WhiteboardModel>) -> FlusterResult<()> {
        let schema = WhiteboardEntity::arrow_schema(None);
        let tbl = get_table(db, WhiteboardEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(WhiteboardEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));

        let primary_key: &[&str] = &["id"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        Ok(())
    }
    pub async fn get_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<WhiteboardModel> {
        let tbl = get_table(db, WhiteboardEntity::table()).await?;
        let items_batch = tbl
            .query()
            .only_if(format!("id = \"{}\"", id))
            .execute()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFind
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFind
            })?;
        if items_batch.is_empty() {
            return Err(FlusterError::NotFoundById);
        }

        let batch = items_batch.index(0);

        let items: Vec<WhiteboardModel> = from_record_batch(batch).map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToSerialize
        })?;

        match items_batch.len() {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(items.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
}

impl DbEntity<WhiteboardModel> for WhiteboardEntity {
    fn arrow_schema(_: Option<i32>) -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("state", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
            Field::new(
                "utime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                true,
            ),
        ]))
    }

    fn to_record_batch(
        item: &WhiteboardModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let state = StringArray::from(vec![item.state.clone()]);

        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let utime_value: i64 = item.utime.parse().unwrap();
        let utime = TimestampMillisecondArray::from(vec![utime_value]);
        // WARN: This flags field might not work. The 'StringArray' field might need to be
        // changed for a different field since this field is an array itself.
        // let flags = StringArray::from(item.flags.clone());
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(state),
                Arc::new(label),
                Arc::new(ctime),
                Arc::new(utime),
            ],
        )
        .unwrap()
    }
}
