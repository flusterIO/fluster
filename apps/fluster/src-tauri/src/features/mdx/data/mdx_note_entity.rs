use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::{
    index::scalar::FullTextSearchQuery,
    query::{ExecutableQuery, QueryBase},
};
use serde_arrow::from_record_batch;
use std::sync::Arc;

use crate::{
    core::{
        database::{
            db::{clean_table, get_table},
            tables::table_paths::DatabaseTables,
        },
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
            FlusterDb,
        },
    },
    features::search::types::PaginationProps,
};

use super::mdx_note_model::MdxNoteModel;

pub struct MdxNoteEntity {}

impl MdxNoteEntity {
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<MdxNoteModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNote).await?;
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

        let mut items: Vec<MdxNoteModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }

        Ok(items)
    }
    pub async fn full_text_search(
        db: &FlusterDb<'_>,
        query: &String,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<MdxNoteModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNote).await?;

        let items_batch = tbl
            .query()
            .full_text_search(FullTextSearchQuery::new(query.to_string()))
            .limit(pagination.per_page as usize)
            .offset((pagination.per_page * (pagination.page_number - 1)) as usize)
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEntity.full_text_search: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEntity.full_text_search: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<MdxNoteModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn get_by_file_paths(
        db: &FlusterDb<'_>,
        file_paths: Vec<String>,
    ) -> FlusterResult<Vec<MdxNoteModel>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::MdxNote).await?;
        let file_paths_string = file_paths
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("file_path in ({})", file_paths_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::MdxNote).await
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<MdxNoteModel>) -> FlusterResult<()> {
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
                println!("Error in MdxNoteEntity.save_many: {:?}", e);
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
        let ctime_value: i64 = item.ctime.parse().unwrap_or(0);
        let last_read_value: i64 = item.last_read.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let last_read = TimestampMillisecondArray::from(vec![last_read_value]);
        // let vec = ListArray::from_iter_primitive::<Float32Type, _, _>(vec![Some(
        //     item.vec.iter().map(|x| Some(*x)),
        // )]);
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
