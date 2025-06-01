use arrow_array::{Date64Array, RecordBatch, RecordBatchIterator};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use chrono::Utc;
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde::{Deserialize, Serialize};
use serde_arrow::from_record_batch;
use std::{ops::Index, sync::Arc};

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::snippet_model::SnippetModel;

#[derive(Serialize, Deserialize, Debug)]
pub struct SnippetEntity {}

impl SnippetEntity {
    pub async fn get_by_id(&self, id: String, conn: FlusterDb<'_>) -> FlusterResult<SnippetModel> {
        let tbl = conn
            .open_table(DatabaseTables::Snippets.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        let res = tbl
            .query()
            .only_if(format!("id = {}", id))
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;

        if res.is_empty() {
            return Err(FlusterError::FailToFind);
        }

        if res.len() > 1 {
            return Err(FlusterError::DuplicateId);
        }

        let batch = res.index(0);
        let items: Vec<SnippetModel> =
            from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;

        let len = items.len();
        match len {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(items.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
    pub async fn save_many(
        &self,
        items: Vec<SnippetModel>,
        db: FlusterDb<'_>,
    ) -> FlusterResult<()> {
        let schema = SnippetEntity::arrow_schema();
        let tbl = db
            .open_table(DatabaseTables::Snippets.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToOpenTable)?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(self.to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        // RESUME: Come back here when back online and able to look at the docs for querying
        // with strings. This needs to turn into an upsert statement.
        // tbl.merge_insert(j)
        tbl.add(stream)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        Ok(())
    }

    async fn get_many_with_langs(
        db: FlusterDb<'_>,
        langs: Vec<String>,
    ) -> FlusterResult<Vec<SnippetModel>> {
        let tbl = db
            .open_table(DatabaseTables::Snippets.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        let items_batch = tbl
            .query()
            .only_if(format!("lang in ({})", langs.join(", ")))
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SnippetModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<SnippetModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }

    async fn get_many_no_langs(db: FlusterDb<'_>) -> FlusterResult<Vec<SnippetModel>> {
        let tbl = db
            .open_table(DatabaseTables::Snippets.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        // let items: Vec<SnippetModel> =
        //     from_record_batch(items_batch).map_err(|_| FlusterError::FailToSerialize)?;
        let mut items: Vec<SnippetModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<SnippetModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn get_many(
        db: FlusterDb<'_>,
        langs: Option<Vec<String>>,
    ) -> FlusterResult<Vec<SnippetModel>> {
        if langs.is_some() {
            SnippetEntity::get_many_with_langs(db, langs.unwrap()).await
        } else {
            SnippetEntity::get_many_no_langs(db).await
        }
    }
}

impl DbEntity<SnippetModel> for SnippetEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new("desc", DataType::Utf8, true),
            Field::new("lang", DataType::Utf8, false),
            Field::new("ctime", DataType::Date64, false),
            Field::new("utime", DataType::Date64, false),
        ]))
    }

    fn to_record_batch(&self, item: &SnippetModel, schema: Arc<Schema>) -> RecordBatch {
        let now = Utc::now().timestamp_millis();
        let ctime = Date64Array::from(vec![item.ctime.unwrap_or(now)]);
        let utime = Date64Array::from(vec![item.utime.unwrap_or(now)]);
        let body = arrow_array::StringArray::from(vec![item.body.clone()]);
        let id = arrow_array::StringArray::from(vec![item
            .id
            .clone()
            .or(Some(uuid::Uuid::new_v4().to_string()))]);
        let desc = arrow_array::StringArray::from(vec![item.desc.clone()]);
        let label = arrow_array::StringArray::from(vec![item.label.clone()]);
        let lang = arrow_array::StringArray::from(vec![item.lang.clone()]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(label),
                Arc::new(body),
                Arc::new(desc),
                Arc::new(lang),
                Arc::new(ctime),
                Arc::new(utime),
            ],
        )
        .unwrap()
    }
}
