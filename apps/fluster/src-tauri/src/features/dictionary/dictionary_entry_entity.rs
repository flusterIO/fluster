use std::sync::Arc;

use arrow_array::{Date64Array, RecordBatch, TimestampMillisecondArray};
use arrow_schema::{DataType, Field, Schema};
use chrono::prelude::*;
use futures::TryStreamExt;
use lancedb::query::ExecutableQuery;
use serde_arrow::from_record_batch;

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::dictionary_entry_model::DictionaryEntryModel;

pub struct DictionaryEntryEntity {}

impl DictionaryEntryEntity {
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<DictionaryEntryModel>> {
        let tbl = db
            .open_table(DatabaseTables::DictionaryEntry.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<DictionaryEntryModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<DictionaryEntryModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<DictionaryEntryModel> for DictionaryEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("label", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &DictionaryEntryModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let label = arrow_array::StringArray::from(vec![item.label.clone()]);
        let body = arrow_array::StringArray::from(vec![item.body.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        RecordBatch::try_new(
            schema,
            vec![Arc::new(label), Arc::new(body), Arc::new(ctime)],
        )
        .unwrap()
    }
}
