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

use super::task_tag_model::TaskTagModel;

pub struct TaskTagEntity {}

type T = TaskTagModel;

impl TaskTagEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::TaskTag
    }

    pub async fn get_by_values(db: &FlusterDb<'_>, ids: Vec<String>) -> FlusterResult<Vec<T>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, TaskTagEntity::table()).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("tag_value in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in TaskTagEntity.get_by_values: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in TaskTagEntity.get_by_values: {:?}", e);
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
    pub async fn get_by_task_ids(db: &FlusterDb<'_>, ids: Vec<String>) -> FlusterResult<Vec<T>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, TaskTagEntity::table()).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("task_id in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in TaskTagEntity.get_by_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in TaskTagEntity.get_by_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!("Error in TaskTagEntity.get_by_ids: {:?}", e);
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
        let tbl = get_table(db, TaskTagEntity::table()).await?;
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
        let tbl = get_table(db, TaskTagEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn delete_by_tag_values(
        db: &FlusterDb<'_>,
        tag_values: Vec<String>,
        task_id: &str,
    ) -> FlusterResult<()> {
        if tag_values.is_empty() {
            return Ok(());
        }
        let values_string = tag_values
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        // FIXME: This needs to specify the other property as well!
        TaskTagEntity::delete(
            db,
            format!(
                "tag_value in ({}) and task_id = \"{}\"",
                values_string, task_id
            ),
        )
        .await
    }
    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let all_task_tags = TaskTagEntity::get_all(
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
                !all_task_tags
                    .iter()
                    .any(|y| (x.task_id == y.task_id) && (x.tag_value == y.tag_value))
            })
            .collect();
        let schema = TaskTagEntity::arrow_schema(None);
        let tbl = get_table(db, TaskTagEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(TaskTagEntity::to_record_batch(x, schema.clone())))
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

impl DbEntity<TaskTagModel> for TaskTagEntity {
    fn arrow_schema(_: Option<i32>) -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("task_id", DataType::Utf8, false),
            Field::new("tag_value", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &TaskTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let task_id = StringArray::from(vec![item.task_id.clone()]);
        let tag_value = StringArray::from(vec![item.tag_value.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(task_id), Arc::new(tag_value)]).unwrap()
    }
}
