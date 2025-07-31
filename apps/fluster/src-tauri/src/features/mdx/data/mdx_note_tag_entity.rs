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
        utils::database_utils::format_string_vec_for_query::format_string_vec_for_query,
    },
    features::search::types::PaginationProps,
};

use super::mdx_note_tag_model::MdxNoteTagModel;

pub struct MdxNoteTagEntity {}

type T = MdxNoteTagModel;

impl MdxNoteTagEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::MdxNoteTag
    }

    pub async fn get_by_tag_values(
        db: &FlusterDb<'_>,
        tag_values: &[String],
    ) -> FlusterResult<Vec<MdxNoteTagModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteTag).await?;

        let values_string = tag_values
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("tag_value in ({})", values_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteTagEntity.get_all: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteTagEntity.get_all: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteTagModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<MdxNoteTagModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteTagEntity.get_all: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn get_by_file_paths(
        db: &FlusterDb<'_>,
        file_paths: &Vec<String>,
    ) -> FlusterResult<Vec<T>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::MdxNoteTag).await?;

        let items_batch = tbl
            .query()
            .only_if(format!(
                "mdx_note_file_path in ({})",
                format_string_vec_for_query(file_paths)
            ))
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

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_all(
        db: &FlusterDb<'_>,
        pagination: PaginationProps,
        predicate: Option<String>,
    ) -> FlusterResult<Vec<T>> {
        let tbl = get_table(db, MdxNoteTagEntity::table()).await?;
        let offset = pagination.per_page * (pagination.page_number - 1);
        let mut q = tbl.query();
        if predicate.is_some() {
            q = q.only_if(predicate.unwrap());
        }
        let items_batch = q
            .offset(offset)
            .limit(pagination.per_page)
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

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<T> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn delete(db: &FlusterDb<'_>, predicate: String) -> FlusterResult<()> {
        let tbl = get_table(db, MdxNoteTagEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let all_note_tags = MdxNoteTagEntity::get_all(
            db,
            PaginationProps {
                per_page: 9999999,
                page_number: 1,
            },
            None,
        )
        .await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_tags: Vec<&T> = items
            .iter()
            .filter(|x| {
                !all_note_tags.iter().any(|y| {
                    (x.mdx_note_file_path == y.mdx_note_file_path) && (x.tag_value == y.tag_value)
                })
            })
            .collect();
        let schema = MdxNoteTagEntity::arrow_schema();
        let tbl = get_table(db, MdxNoteTagEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(MdxNoteTagEntity::to_record_batch(x, schema.clone())))
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
}

impl DbEntity<MdxNoteTagModel> for MdxNoteTagEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("tag_value", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let tag_value = StringArray::from(vec![item.tag_value.clone()]);
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(mdx_note_file_path), Arc::new(tag_value)],
        )
        .unwrap()
    }
}
