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

use super::mdx_note_dictionary_entry_model::MdxNoteDictionaryEntryModel;

pub struct MdxNoteDictionaryEntryEntity {}

type T = MdxNoteDictionaryEntryModel;

impl MdxNoteDictionaryEntryEntity {
    pub async fn get_by_labels(db: &FlusterDb<'_>, labels: &[String]) -> FlusterResult<Vec<T>> {
        if labels.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, MdxNoteDictionaryEntryEntity::table()).await?;
        let labels_string = labels
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("dictionary_entry_label in ({})", labels_string))
            .execute()
            .await
            .map_err(|e| {
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
                    e
                );
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
                    e
                );
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
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
    ) -> FlusterResult<Vec<T>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, MdxNoteDictionaryEntryEntity::table()).await?;
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
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
                    e
                );
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
                    e
                );
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!(
                    "Error in MdxNoteDictionaryEntity.get_by_file_paths: {:?}",
                    e
                );
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl MdxNoteDictionaryEntryEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::MdxNoteDictionaryEntry
    }

    pub async fn get_all(
        db: &FlusterDb<'_>,
        pagination: PaginationProps,
        predicate: Option<String>,
    ) -> FlusterResult<Vec<T>> {
        let tbl = get_table(db, MdxNoteDictionaryEntryEntity::table()).await?;
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
                println!("Error in MdxNoteDictionaryEntity.get_all: {:?}", e);
                FlusterError::FailToFind
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteDictionaryEntity.get_all: {:?}", e);
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
        let tbl = get_table(db, MdxNoteDictionaryEntryEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let schema = MdxNoteDictionaryEntryEntity::arrow_schema();
        let tbl = get_table(db, MdxNoteDictionaryEntryEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| {
                Ok(MdxNoteDictionaryEntryEntity::to_record_batch(
                    x,
                    schema.clone(),
                ))
            })
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

impl DbEntity<T> for MdxNoteDictionaryEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("dictionary_entry_label", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &T,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let dictionary_entry_label = StringArray::from(vec![item.dictionary_entry_label.clone()]);

        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(mdx_note_file_path),
                Arc::new(dictionary_entry_label),
            ],
        )
        .unwrap()
    }
}
