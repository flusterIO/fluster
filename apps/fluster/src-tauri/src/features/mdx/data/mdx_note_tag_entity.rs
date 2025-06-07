use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::ExecutableQuery;
use serde_arrow::from_record_batch;

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

use super::mdx_note_tag_model::MdxNoteTagModel;

pub struct MdxNoteTagEntity {}

impl MdxNoteTagEntity {
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::MdxNoteTag).await
    }
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<MdxNoteTagModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteTag).await?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteTagModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<MdxNoteTagModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(items: Vec<MdxNoteTagModel>, db: &FlusterDb<'_>) -> FlusterResult<()> {
        let all_note_tags = MdxNoteTagEntity::get_all(db).await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_tags: Vec<&MdxNoteTagModel> = items
            .iter()
            .filter(|x| {
                all_note_tags.iter().any(|y| {
                    (x.mdx_note_file_path == y.mdx_note_file_path) && (x.tag_value == y.tag_value)
                })
            })
            .collect();
        let schema = MdxNoteTagEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::MdxNoteTag).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_tags
            .iter()
            .map(|x| Ok(MdxNoteTagEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        tbl.add(stream)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        Ok(())
    }
}

impl DbEntity<MdxNoteTagModel> for MdxNoteTagEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("tag_value", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteTagModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let tag_value = StringArray::from(vec![item.tag_value.clone()]);
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(mdx_note_file_path), Arc::new(tag_value)],
        )
        .unwrap()
    }
}
