use std::{ops::Index, sync::Arc};

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use super::ai_chat_model::AiChatModel;
use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

pub struct AiChatEntity {}

impl AiChatEntity {
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::AiChat).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<AiChatModel>> {
        let tbl = get_table(db, DatabaseTables::AiChat).await?;
        let items_batch = tbl
            .query()
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

        let mut items: Vec<AiChatModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<AiChatModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }

        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<AiChatModel>) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::AiChat).await?;
        let schema = AiChatEntity::arrow_schema();
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(AiChatEntity::to_record_batch(x, schema.clone())))
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
    pub async fn get_by_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<AiChatModel> {
        let tbl = get_table(db, DatabaseTables::AiChat).await?;

        let items_batch = tbl
            .query()
            .only_if(format!("id = \"{}\"", id))
            .execute()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFindById
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFindById
            })?;

        if items_batch.is_empty() {
            return Err(FlusterError::FailToFindById);
        }

        let data: Vec<AiChatModel> = from_record_batch(items_batch.index(0)).map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToSerialize
        })?;

        match data.len() {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(data.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
}

impl DbEntity<AiChatModel> for AiChatEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &AiChatModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        RecordBatch::try_new(schema, vec![Arc::new(id), Arc::new(label), Arc::new(ctime)]).unwrap()
    }
}
