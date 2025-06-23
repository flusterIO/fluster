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

use super::equation_snippet_model::EquationSnippetModel;

pub struct EquationSnippetEntity {}

type T = EquationSnippetModel;

impl EquationSnippetEntity {
    pub fn table() -> DatabaseTables {
        DatabaseTables::EquationSnippets
    }

    pub async fn get_all(
        db: &FlusterDb<'_>,
        pagination: PaginationProps,
        predicate: Option<String>,
    ) -> FlusterResult<Vec<T>> {
        let tbl = get_table(db, EquationSnippetEntity::table()).await?;
        let offset = (pagination.per_page * (pagination.page_number - 1)) as usize;
        let mut q = tbl.query();
        if predicate.is_some() {
            q = q.only_if(predicate.unwrap());
        }
        let items_batch = q
            .offset(offset)
            .limit(pagination.per_page as usize)
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
    pub async fn save(db: &FlusterDb<'_>, items: Vec<EquationSnippetModel>) -> FlusterResult<()> {
        let all_equation_snippets = EquationSnippetEntity::get_all(
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
                all_equation_snippets
                    .iter()
                    .any(|y| (x.snippet_id == y.snippet_id) && (x.equation_id == y.equation_id))
            })
            .collect();
        let schema = EquationSnippetEntity::arrow_schema();
        let tbl = get_table(db, EquationSnippetEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(EquationSnippetEntity::to_record_batch(x, schema.clone())))
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

    pub async fn delete(db: &FlusterDb<'_>, data: EquationSnippetModel) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::EquationSnippets).await?;
        tbl.delete(&format!(
            "equation_id = \"{}\" AND snippet_id = \"{}\"",
            data.equation_id, data.snippet_id
        ))
        .await
        .map_err(|_| FlusterError::FailToDelete)?;
        Ok(())
    }
}

impl DbEntity<EquationSnippetModel> for EquationSnippetEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("snippet_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationSnippetModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let snippet_id = StringArray::from(vec![item.snippet_id.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(equation_id), Arc::new(snippet_id)]).unwrap()
    }
}
