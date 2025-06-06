use std::sync::Arc;

use arrow_array::{Int32Array, Int64Array, RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};

use crate::core::{
    database::{
        db::{clean_table, get_table},
        tables::table_paths::DatabaseTables,
    },
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::{front_matter_model::FrontMatterModel, mdx_note_entity::MdxNoteEntity};

pub struct FrontMatterEntity {}

impl FrontMatterEntity {
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::FrontMatter).await
    }
    pub async fn save_many(items: Vec<FrontMatterModel>, db: &FlusterDb<'_>) -> FlusterResult<()> {
        // RESUME: Come back here to take care of the sync method.
        let schema = FrontMatterEntity::arrow_schema();
        let tbl = get_table(&db, DatabaseTables::FrontMatter).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(FrontMatterEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&str] = &["mdx_note_file_path"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                println!("Error in front matter: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        Ok(())
    }
}

impl DbEntity<FrontMatterModel> for FrontMatterEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, false),
            Field::new("title", DataType::Utf8, false),
            Field::new("summary", DataType::Utf8, true),
            Field::new("list_id", DataType::Utf8, true),
            Field::new("list_index", DataType::Int64, true),
        ]))
    }

    fn to_record_batch(
        item: &FrontMatterModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let title = StringArray::from(vec![item.title.clone()]);
        let summary = StringArray::from(vec![item.summary.clone()]);
        let list_id = StringArray::from(vec![item.list_id.clone()]);
        let list_index = Int64Array::from(vec![item.list_index.clone().unwrap_or(0)]);
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(mdx_note_file_path),
                Arc::new(user_provided_id),
                Arc::new(title),
                Arc::new(summary),
                Arc::new(list_id),
                Arc::new(list_index),
            ],
        )
        .unwrap()
    }
}
