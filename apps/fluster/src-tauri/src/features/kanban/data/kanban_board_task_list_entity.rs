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

use super::kanban_board_entry_model::KanbanBoardTaskListModel;

pub struct KanbanBoardTaskListEntity {}

impl KanbanBoardTaskListEntity {
    pub async fn delete_by_id(db: &FlusterDb<'_>, file_path: String) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::KanbanBoardList).await?;
        tbl.delete(&format!("id = \"{}\"", file_path))
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
    ) -> FlusterResult<Vec<KanbanBoardTaskListModel>> {
        let tbl = get_table(db, DatabaseTables::KanbanBoardList).await?;

        let query = match predicate {
            None => tbl.query(),
            Some(predicate_string) => tbl.query().only_if(predicate_string),
        };
        let items_batch = query
            .limit(pagination.per_page as usize)
            .offset((pagination.per_page * (pagination.page_number - 1)) as usize)
            .execute()
            .await
            .map_err(|e| {
                println!("Error in KanbanBoardTaskListEntity.get_many: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in KanbanBoardTaskListEntity.get_many: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<KanbanBoardTaskListModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<KanbanBoardTaskListModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(
        db: &FlusterDb<'_>,
        entries: &[KanbanBoardTaskListModel],
    ) -> FlusterResult<()> {
        let schema = KanbanBoardTaskListEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::KanbanBoardList).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| {
                Ok(KanbanBoardTaskListEntity::to_record_batch(
                    x,
                    schema.clone(),
                ))
            })
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

impl DbEntity<KanbanBoardTaskListModel> for KanbanBoardTaskListEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("kanban_board_entry_id", DataType::Utf8, false),
            Field::new("task_list_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &KanbanBoardTaskListModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let kanban_board_entry_id = StringArray::from(vec![item.kanban_board_entry_id.clone()]);
        let task_list_id = StringArray::from(vec![item.task_list_id.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(kanban_board_entry_id), Arc::new(task_list_id)],
        )
        .unwrap()
    }
}
