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

use super::kanban_board_entry_model::KanbanCardModel;

pub struct KanbanBoardEntryEntity {}

impl KanbanBoardEntryEntity {
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: &str) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::KanbanCard).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;
        Ok(())
    }
    pub async fn get_many(
        db: &FlusterDb<'_>,
        predicate: &Option<String>,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<KanbanCardModel>> {
        let tbl = get_table(db, DatabaseTables::KanbanCard).await?;

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
                println!("Error in KanbanBoardEntryEntity.get_many: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in KanbanBoardEntryEntity.get_many: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<KanbanCardModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<KanbanCardModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, entries: &[KanbanCardModel]) -> FlusterResult<()> {
        let schema = KanbanBoardEntryEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::KanbanCard).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| Ok(KanbanBoardEntryEntity::to_record_batch(x, schema.clone())))
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

impl DbEntity<KanbanCardModel> for KanbanBoardEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("desc", DataType::Utf8, true),
            Field::new("body", DataType::Utf8, true),
            Field::new("list_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &KanbanCardModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let desc = StringArray::from(vec![item.desc.clone()]);
        let body = StringArray::from(vec![item.body.clone()]);
        let list_id = StringArray::from(vec![item.list_id.clone()]);

        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(label),
                Arc::new(desc),
                Arc::new(body),
                Arc::new(list_id),
            ],
        )
        .unwrap()
    }
}
