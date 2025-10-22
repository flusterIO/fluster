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

use super::mdx_note_topic_model::MdxNoteTopicModel;

pub struct MdxNoteTopicEntity {}

type T = MdxNoteTopicModel;

impl MdxNoteTopicEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::MdxNoteTopic
    }

    pub async fn get_by_values(
        db: &FlusterDb<'_>,
        topic_values: &[String],
    ) -> FlusterResult<Vec<MdxNoteTopicModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteTopic).await?;

        let values_string = topic_values
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("topic_value in ({})", values_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteTopicEntity.get_by_values: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteTopicEntity.get_by_values: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteTopicModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<MdxNoteTopicModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteTopicEntity.get_by_values: {:?}", e);
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
        let tbl = get_table(db, MdxNoteTopicEntity::table()).await?;
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
                println!("Error in MdxNoteTopicEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteTopicEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteTopicEntity.get_by_file_paths: {:?}", e);
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
        let tbl = get_table(db, MdxNoteTopicEntity::table()).await?;
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
        let tbl = get_table(db, MdxNoteTopicEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let all_note_tags = MdxNoteTopicEntity::get_all(
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
                        && (x.topic_value == y.topic_value)
                })
            })
            .collect();
        let schema = MdxNoteTopicEntity::arrow_schema();
        let tbl = get_table(db, MdxNoteTopicEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(MdxNoteTopicEntity::to_record_batch(x, schema.clone())))
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

impl DbEntity<T> for MdxNoteTopicEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("topic_value", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &T,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let topic_value = StringArray::from(vec![item.topic_value.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(mdx_note_file_path), Arc::new(topic_value)],
        )
        .unwrap()
    }
}
