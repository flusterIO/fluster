use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;
use std::sync::Arc;

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
    pub async fn get_by_equation_entry_id(
        db: &FlusterDb<'_>,
        equation_id: &str,
    ) -> FlusterResult<Vec<MdxNoteEquationModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteEquation).await?;
        let items_batch = tbl
            .query()
            .only_if(format!("equation_id = \"{}\"", equation_id))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MxNoteEquationEntitty.get_by_equation_id: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MxNoteEquationEntitty.get_by_equation_id: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteEquationModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteEquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MxNoteEquationEntitty.get_by_equation_id: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn get_by_file_paths(
        db: &FlusterDb<'_>,
        file_paths: &[String],
    ) -> FlusterResult<Vec<MdxNoteEquationModel>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::MdxNoteEquation).await?;
        let file_paths_string = file_paths
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("mdx_note_file_path in ({})", file_paths_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteEquationModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<MdxNoteEquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<MdxNoteEquationModel>> {
        let tbl = get_table(db, DatabaseTables::MdxNoteEquation).await?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_all: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_all: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<MdxNoteEquationModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<MdxNoteEquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteEquationEntity.get_all: {:?}", e);
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
        db: &FlusterDb<'_>,
        items: Vec<MdxNoteEquationModel>,
    ) -> FlusterResult<()> {
        let all_note_equations = MdxNoteEquationEntity::get_all(db).await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_equations: Vec<&MdxNoteEquationModel> = items
            .iter()
            .filter(|x| {
                !all_note_equations.iter().any(|y| {
                    (x.mdx_note_file_path == y.mdx_note_file_path)
                        && (x.equation_id == y.equation_id)
                })
            })
            .collect();
        if filtered_equations.is_empty() {
            return Ok(());
        }
        let schema = MdxNoteEquationEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::MdxNoteEquation).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_equations
            .iter()
            .map(|x| Ok(MdxNoteEquationEntity::to_record_batch(x, schema.clone())))
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
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);

        RecordBatch::try_new(
            schema,
            vec![Arc::new(mdx_note_file_path), Arc::new(equation_id)],
        )
        .unwrap()
    }
}
