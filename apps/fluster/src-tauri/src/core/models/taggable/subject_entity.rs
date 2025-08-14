use super::shared_taggable_model::SharedTaggableModel;
use arrow_array::{RecordBatch, RecordBatchIterator, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde::{Deserialize, Serialize};
use serde_arrow::from_record_batch;
use std::sync::Arc;

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

#[derive(specta::Type, Deserialize, Serialize, Clone)]
pub struct SubjectEntity {}

impl SubjectEntity {
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<SharedTaggableModel>> {
        let tbl = get_table(db, DatabaseTables::Subject).await?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|e| {
                println!("Error in SubjectEntity.get_all: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in SubjectEntity.get_all: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SharedTaggableModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<SharedTaggableModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in SubjectEntity.get_all: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn create_many(
        db: &FlusterDb<'_>,
        items: Vec<SharedTaggableModel>,
    ) -> FlusterResult<()> {
        let existing_topics = SubjectEntity::get_all(db).await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_topics: Vec<&SharedTaggableModel> = items
            .iter()
            .filter(|x| !existing_topics.iter().any(|y| (x.value == y.value)))
            .collect::<Vec<&SharedTaggableModel>>();
        let schema = SubjectEntity::arrow_schema(None);
        let tbl = get_table(db, DatabaseTables::Subject).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_topics
            .iter()
            .map(|x| Ok(SubjectEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        tbl.add(stream).execute().await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCreateEntity
        })?;
        Ok(())
    }
    pub async fn get_by_values(
        db: &FlusterDb<'_>,
        values: Vec<String>,
    ) -> FlusterResult<Vec<SharedTaggableModel>> {
        if values.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(
            db,
            crate::core::database::tables::table_paths::DatabaseTables::Subject,
        )
        .await?;
        let values_string = values
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("value in ({})", values_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in SubjectEntity.get_by_values: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in SubjectEntity.get_by_values: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SharedTaggableModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<SharedTaggableModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in SubjectEntity.get_by_values: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<SharedTaggableModel> for SubjectEntity {
    fn to_record_batch(item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema(_: Option<i32>) -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }
}
