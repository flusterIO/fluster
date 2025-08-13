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

use super::mdx_note_bib_entry_model::MdxNoteBibEntryModel;

pub struct MdxNoteBibEntryEntity {}

type T = MdxNoteBibEntryModel;

impl MdxNoteBibEntryEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::MdxNoteBibEntry
    }

    pub async fn get_by_bib_entry_id(
        db: &FlusterDb<'_>,
        bib_entry_id: &str,
    ) -> FlusterResult<Vec<MdxNoteBibEntryModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteBibEntry).await?;
        let items_batch = tbl
            .query()
            .only_if(format!("bib_entry_id = \"{}\"", bib_entry_id))
            .execute()
            .await
            .map_err(|e| {
                println!(
                    "Error in MdxNoteBibEntryEntity.get_by_bib_entry_id: {:?}",
                    e
                );
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!(
                    "Error in MdxNoteBibEntryEntity.get_by_bib_entry_id: {:?}",
                    e
                );
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteBibEntryModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteBibEntryModel> = from_record_batch(batch).map_err(|e| {
                println!(
                    "Error in MdxNoteBibEntryEntity.get_by_bib_entry_id: {:?}",
                    e
                );
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn get_by_file_paths(
        db: &FlusterDb<'_>,
        file_paths: &[String],
    ) -> FlusterResult<Vec<MdxNoteBibEntryModel>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::MdxNoteBibEntry).await?;
        let file_paths_string = file_paths
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("mdx_note_file_path in ({})", file_paths_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteBibEntryEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteBibEntryEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteBibEntryModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteBibEntryModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteBibEntryEntity.get_by_file_paths: {:?}", e);
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
        let tbl = get_table(db, MdxNoteBibEntryEntity::table()).await?;
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
        let tbl = get_table(db, MdxNoteBibEntryEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let all_note_tags = MdxNoteBibEntryEntity::get_all(
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
                    (x.mdx_note_file_path == y.mdx_note_file_path)
                        && (x.bib_entry_id == y.bib_entry_id)
                })
            })
            .collect();
        let schema = MdxNoteBibEntryEntity::arrow_schema();
        let tbl = get_table(db, MdxNoteBibEntryEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(MdxNoteBibEntryEntity::to_record_batch(x, schema.clone())))
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

impl DbEntity<T> for MdxNoteBibEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("bib_entry_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &T,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let bib_entry_id = StringArray::from(vec![item.bib_entry_id.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(mdx_note_file_path), Arc::new(bib_entry_id)],
        )
        .unwrap()
    }
}
