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
use futures::TryStreamExt;
use lancedb::{
    index::scalar::{FtsQuery, FullTextSearchQuery, MatchQuery},
    query::{ExecutableQuery, QueryBase},
};
use serde_arrow::from_record_batch;
use std::{ops::Index, sync::Arc};

pub struct BibEntryEntity {}

impl BibEntryEntity {
    pub async fn get_by_ids(
        db: &FlusterDb<'_>,
        ids: Vec<String>,
    ) -> FlusterResult<Vec<BibEntryModel>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x.to_lowercase()))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("id in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in BibEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in BibEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<BibEntryModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<BibEntryModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in BibEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_count(db: &FlusterDb<'_>, predicate: Option<String>) -> FlusterResult<usize> {
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;
        tbl.count_rows(predicate)
            .await
            .map_err(|_| FlusterError::FailToCount)
    }
    pub async fn full_text_search(
        db: &FlusterDb<'_>,
        query: &String,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<BibEntryModel>> {
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;

        let items_batch = tbl
            .query()
            .full_text_search(FullTextSearchQuery {
                query: FtsQuery::Match(MatchQuery::new(query.to_string())),
                limit: Some(pagination.per_page as i64),
                wand_factor: None,
            })
            .limit(pagination.per_page)
            .offset(pagination.per_page * (pagination.page_number - 1))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in BibEntryEntity.full_text_search: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in BibEntryEntity.full_text_search: {:?}", e);
                FlusterError::FailToFind
            })?;

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
            .limit(pagination.per_page)
            .offset(pagination.per_page * (pagination.page_number - 1))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in BibEntryEntity.full_text_search: {:?}", e);
                FlusterError::FailToConnect
            })?
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
    pub async fn save_many(db: &FlusterDb<'_>, entries: &[BibEntryModel]) -> FlusterResult<()> {
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
    pub async fn get_by_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<BibEntryModel> {
        let tbl = get_table(db, DatabaseTables::BibEntry).await?;

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

        let data: Vec<BibEntryModel> = from_record_batch(items_batch.index(0)).map_err(|e| {
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

impl DbEntity<BibEntryModel> for BibEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, true),
            Field::new("html_citation", DataType::Utf8, true),
            Field::new("pdf_path", DataType::Utf8, true),
            Field::new("data", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &BibEntryModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.to_lowercase().clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let html_citation = StringArray::from(vec![item.html_citation.clone()]);
        let pdf_path = StringArray::from(vec![item.pdf_path.clone()]);
        let data = StringArray::from(vec![item.data.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(user_provided_id),
                Arc::new(html_citation),
                Arc::new(pdf_path),
                Arc::new(data),
                Arc::new(ctime),
            ],
        )
        .unwrap()
    }
}
