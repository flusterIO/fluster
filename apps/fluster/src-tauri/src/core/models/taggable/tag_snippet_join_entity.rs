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
    features::snippets::snippet_model::SnippetModel,
};

use super::tag_snippet_join_model::SnippetTagModel;

pub struct SnippetTagEntity {}

impl SnippetTagEntity {
    pub async fn get_many(
        db: &FlusterDb<'_>,
        predicate: Option<String>,
    ) -> FlusterResult<Vec<SnippetTagModel>> {
        let tbl = get_table(db, DatabaseTables::SnippetTags).await?;
        let query = match predicate {
            None => tbl.query(),
            Some(x) => tbl.query().only_if(x),
        };
        let items_batch = query
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SnippetTagModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<SnippetTagModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(items: Vec<SnippetTagModel>, db: FlusterDb<'_>) -> FlusterResult<()> {
        let schema = SnippetTagEntity::arrow_schema();
        let existing_tags = SnippetTagEntity::get_many(&db, None).await?;
        let tbl = get_table(
            &db,
            crate::core::database::tables::table_paths::DatabaseTables::Tags,
        )
        .await?;
        let mut filtered_items = Vec::new();
        for item in items {
            let exists = existing_tags
                .iter()
                .any(|y| y.tag_id == item.tag_id && y.snippet_id == item.snippet_id);
            if !exists {
                filtered_items.push(item);
            }
        }
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_items
            .iter()
            .map(|x| Ok(SnippetTagEntity::to_record_batch(x, schema.clone())))
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
                println!("Error in snippet tag: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;

        Ok(())
    }
}

impl DbEntity<SnippetTagModel> for SnippetTagEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("snippet_id", DataType::Utf8, false),
            Field::new("tag_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &SnippetTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let snippet_id = StringArray::from(vec![item.snippet_id.clone()]);
        let tag_id = StringArray::from(vec![item.tag_id.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(snippet_id), Arc::new(tag_id)]).unwrap()
    }
}
