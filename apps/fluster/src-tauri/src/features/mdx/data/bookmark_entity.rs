use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

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

use super::bookmark_model::BookmarkModel;

pub struct BookmarkEntity {}

impl BookmarkEntity {
    pub async fn delete_by_file_path(db: &FlusterDb<'_>, file_path: String) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::Bookmark).await?;
        tbl.delete(&format!("mdx_file_path = \"{}\"", file_path))
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToDelete
            })?;
        Ok(())
    }
    pub async fn get_many(
        db: &FlusterDb<'_>,
        predicate: &Option<String>,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<BookmarkModel>> {
        let tbl = get_table(db, DatabaseTables::Bookmark).await?;

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
                println!("Error in BookmarkEntity.get_many: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in BookmarkEntity.get_many: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<BookmarkModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<BookmarkModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, entries: &[BookmarkModel]) -> FlusterResult<()> {
        let schema = BookmarkEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Bookmark).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| Ok(BookmarkEntity::to_record_batch(x, schema.clone())))
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
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
        Ok(())
    }
}

impl DbEntity<BookmarkModel> for BookmarkEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_file_path", DataType::Utf8, false),
            Field::new("id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &BookmarkModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_file_path = StringArray::from(vec![item.mdx_file_path.clone()]);
        let id = StringArray::from(vec![item.id.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_file_path), Arc::new(id)]).unwrap()
    }
}
