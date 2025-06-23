use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{DataType, Field, Schema};
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

use super::ai_chat_request_model::AiChatRequestMessageModel;

pub struct AiChatRequestEntity {}

impl AiChatRequestEntity {
    pub async fn save_chat_request(
        db: &FlusterDb<'_>,
        req: AiChatRequestMessageModel,
    ) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::AiChatRequest).await?;
        let schema = AiChatRequestEntity::arrow_schema();
        let batch = Ok(AiChatRequestEntity::to_record_batch(&req, schema.clone()));
        let stream = Box::new(RecordBatchIterator::new(
            vec![batch].into_iter(),
            schema.clone(),
        ));
        tbl.add(stream).execute().await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToWriteChatSession
        })?;
        Ok(())
    }
    pub async fn get_by_chat_id(
        db: &FlusterDb<'_>,
        id: &str,
    ) -> FlusterResult<Vec<AiChatRequestMessageModel>> {
        let tbl = get_table(db, DatabaseTables::AiChatRequest).await?;

        let items_batch = tbl
            .query()
            .only_if(format!("chat_id = \"{}\"", id))
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

        let mut items: Vec<AiChatRequestMessageModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<AiChatRequestMessageModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<AiChatRequestMessageModel> for AiChatRequestEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("chat_id", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new(
                "sent_at",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &AiChatRequestMessageModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let chat_id = StringArray::from(vec![item.chat_id.clone()]);
        let body = StringArray::from(vec![item.body.clone()]);
        let sent_at_value: i64 = item.sent_at.parse().unwrap();
        let sent_at = TimestampMillisecondArray::from(vec![sent_at_value]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(chat_id),
                Arc::new(body),
                Arc::new(sent_at),
            ],
        )
        .unwrap()
    }
}
