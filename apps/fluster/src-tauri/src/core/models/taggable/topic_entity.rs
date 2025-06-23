use std::sync::Arc;

use arrow_array::{RecordBatch, TimestampMillisecondArray};
use arrow_schema::{DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use super::shared_taggable_model::SharedTaggableModel;
use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

#[derive(Clone)]
pub struct TopicEntity {}

impl TopicEntity {
    pub async fn get_by_values(
        db: &FlusterDb<'_>,
        values: Vec<String>,
    ) -> FlusterResult<Vec<SharedTaggableModel>> {
        let tbl = get_table(db, DatabaseTables::Topic).await?;
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
                println!("Error in TopicEntity.get_by_values: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in TopicEntity.get_by_values: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SharedTaggableModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<SharedTaggableModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in TopicEntity.get_by_values: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<SharedTaggableModel> for TopicEntity {
    fn to_record_batch(item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime = TimestampMillisecondArray::from(vec![item.ctime.timestamp_millis()]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
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
