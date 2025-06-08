use super::bib_entry_model::BibEntryModel;
use crate::{
    core::{
        database::{db::get_table, tables::table_paths::DatabaseTables},
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
            FlusterDb,
        },
    },
    features::search::types::PaginationProps,
};
use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::{io::Flush, TryStreamExt};
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;
use std::sync::Arc;

pub struct BibEntryEntity {}

impl BibEntryEntity {
    pub async fn get_many(
        db: &FlusterDb<'_>,
        predicate: &Option<String>,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<BibEntryModel>> {
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;

        let query = match predicate {
            None => tbl.query(),
            Some(predicate_string) => tbl.query().only_if(predicate_string),
        };
        let items_batch = query
            .limit(pagination.per_page as usize)
            .offset((pagination.per_page * (pagination.page_number - 1)) as usize)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<BibEntryModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<BibEntryModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, entries: &Vec<BibEntryModel>) -> FlusterResult<()> {
        let schema = BibEntryEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| Ok(BibEntryEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&'static str; 1] = &["id"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|_| FlusterError::FailToParseBibFile)?;
        Ok(())
    }
}

impl DbEntity<BibEntryModel> for BibEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, false),
            Field::new("data", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                true,
            ),
        ]))
    }

    fn to_record_batch(
        item: &BibEntryModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let data = StringArray::from(vec![item.data.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(user_provided_id),
                Arc::new(data),
                Arc::new(ctime),
            ],
        )
        .unwrap()
    }
}
