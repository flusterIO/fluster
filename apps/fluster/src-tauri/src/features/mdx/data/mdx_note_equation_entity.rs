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

use super::mdx_note_equation_model::MdxNoteEquationModel;

pub struct MdxNoteEquationEntity {}

impl MdxNoteEquationEntity {
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<MdxNoteEquationModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteEquation).await?;
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
        let mut items: Vec<MdxNoteEquationModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<MdxNoteEquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::MdxNoteEquation).await
    }
    pub async fn save_many(
        items: Vec<MdxNoteEquationModel>,
        db: &FlusterDb<'_>,
    ) -> FlusterResult<()> {
        let all_note_equations = MdxNoteEquationEntity::get_all(db).await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_equations: Vec<&MdxNoteEquationModel> = items
            .iter()
            .filter(|x| {
                all_note_equations.iter().any(|y| {
                    (x.mdx_note_file_path == y.mdx_note_file_path)
                        && (x.equation_id == y.equation_id)
                })
            })
            .collect();
        let schema = MdxNoteEquationEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::MdxNoteTag).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_equations
            .iter()
            .map(|x| Ok(MdxNoteEquationEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        tbl.add(stream)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity);
        Err(FlusterError::NotImplemented)
    }
}

impl DbEntity<MdxNoteEquationModel> for MdxNoteEquationEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("equation_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteEquationModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_id = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_note_id), Arc::new(equation_id)]).unwrap()
    }
}
