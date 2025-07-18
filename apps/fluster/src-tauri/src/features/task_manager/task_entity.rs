use std::{ops::Index, sync::Arc};

use arrow_array::{
    BooleanArray, RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray,
};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::task_model::TaskModel;

pub struct TaskEntity {}

impl TaskEntity {
    pub async fn count_by_list_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<usize> {
        let tbl = get_table(db, DatabaseTables::Task).await?;
        tbl.count_rows(Some(format!("task_list_id = \"{}\"", id)))
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToDelete
            })
    }
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::Task).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;
        Ok(())
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<TaskModel>) -> FlusterResult<()> {
        let schema = TaskEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Task).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(TaskEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));

        let primary_key: &[&str] = &["id"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        Ok(())
    }
    pub async fn get_incomplete_with_due_date(db: &FlusterDb<'_>) -> FlusterResult<Vec<TaskModel>> {
        let tbl = get_table(
            db,
            crate::core::database::tables::table_paths::DatabaseTables::Task,
        )
        .await?;
        let items_batch = tbl
            .query()
            .only_if("complete = False")
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
        let mut items: Vec<TaskModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<TaskModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            for d in data {
                if !d.complete && d.due_at.is_some() {
                    items.push(d);
                }
            }
        }
        Ok(items)
    }
    pub async fn get_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<TaskModel> {
        let tbl = get_table(
            db,
            crate::core::database::tables::table_paths::DatabaseTables::Task,
        )
        .await?;
        let items_batch = tbl
            .query()
            .only_if(format!("id = \"{}\"", id))
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
            return Err(FlusterError::NotFoundById);
        }

        let batch = items_batch.index(0);

        let items: Vec<TaskModel> = from_record_batch(batch).map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToSerialize
        })?;
        // for batch in items_batch.iter() {
        // }
        //

        match items_batch.len() {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(items.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
    pub async fn get_by_list_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<Vec<TaskModel>> {
        let tbl = get_table(
            db,
            crate::core::database::tables::table_paths::DatabaseTables::Task,
        )
        .await?;
        let items_batch = tbl
            .query()
            .only_if(format!("task_list_id = \"{}\"", id))
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
        let mut items: Vec<TaskModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<TaskModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<TaskModel> for TaskEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("notes", DataType::Utf8, true),
            Field::new("task_list_id", DataType::Utf8, false),
            Field::new(
                "due_at",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                true,
            ),
            Field::new("complete", DataType::Boolean, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &TaskModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let notes = StringArray::from(vec![item.notes.clone()]);
        let task_list_id = StringArray::from(vec![item.task_list_id.clone()]);
        let complete = BooleanArray::from(vec![item.complete]);

        let due_at_value: Option<i64> = item.due_at.as_ref().map(|x| x.parse().unwrap());
        let due_at = TimestampMillisecondArray::from(vec![due_at_value]);

        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        // WARN: This flags field might not work. The 'StringArray' field might need to be
        // changed for a different field since this field is an array itself.
        // let flags = StringArray::from(item.flags.clone());
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(label),
                Arc::new(notes),
                Arc::new(task_list_id),
                Arc::new(due_at),
                Arc::new(complete),
                Arc::new(ctime),
            ],
        )
        .unwrap()
    }
}
