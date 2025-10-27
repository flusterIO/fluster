use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, UInt32Array};
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
    features::{
        flashcard::data::models::flashcard_model::FlashcardModel, search::types::PaginationProps,
    },
};

pub struct FlashcardEntity {}

impl FlashcardEntity {
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::Flashcard).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;
        Ok(())
    }

    pub async fn get_by_ids(
        db: &FlusterDb<'_>,
        ids: Vec<String>,
    ) -> FlusterResult<Vec<FlashcardModel>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::Flashcard).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x.to_lowercase()))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("id in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in FlashcardEntity.get_by_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in FlashcardEntity.get_by_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<FlashcardModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<FlashcardModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in FlashcardEntity.get_by_ids: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_many(
        db: &FlusterDb<'_>,
        predicate: &Option<String>,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<FlashcardModel>> {
        let tbl = get_table(db, DatabaseTables::Flashcard).await?;

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
                println!("Error in FlashcardEntity.get_many: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in FlashcardEntity.get_many: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }

        let mut items: Vec<FlashcardModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<FlashcardModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, entries: &[FlashcardModel]) -> FlusterResult<()> {
        let schema = FlashcardEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Flashcard).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| Ok(FlashcardEntity::to_record_batch(x, schema.clone())))
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

impl DbEntity<FlashcardModel> for FlashcardEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("answer", DataType::Utf8, false),
            Field::new("answer_description", DataType::Utf8, false),
            Field::new("question", DataType::Utf8, false),
            Field::new("question_description", DataType::Utf8, false),
            Field::new("correct_count", DataType::UInt32, false),
            Field::new("incorrect_count", DataType::UInt32, false),
        ]))
    }

    fn to_record_batch(
        item: &FlashcardModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let label = StringArray::from(vec![item.label.clone()]);
        let answer = StringArray::from(vec![item.answer.clone()]);
        let answer_description = StringArray::from(vec![item.answer_description.clone()]);
        let question = StringArray::from(vec![item.question.clone()]);
        let question_description = StringArray::from(vec![item.question_description.clone()]);
        let correct_count = UInt32Array::from(vec![item.correct_count]);
        let incorrect_count = UInt32Array::from(vec![item.incorrect_count]);

        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(label),
                Arc::new(answer),
                Arc::new(answer_description),
                Arc::new(question),
                Arc::new(question_description),
                Arc::new(correct_count),
                Arc::new(incorrect_count),
            ],
        )
        .unwrap()
    }
}
