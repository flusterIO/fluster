use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};
use arrow_array::{Date64Array, RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;
use std::{ops::Index, sync::Arc};

use super::equation_model::EquationModel;

/// Note that despite snippets being bound to this the model for convenience, they must be saved
/// and read seperately.
pub struct EquationEntity {}

impl EquationEntity {
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<EquationModel>) -> FlusterResult<()> {
        let schema = EquationEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Equations).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(EquationEntity::to_record_batch(x, schema.clone())))
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
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        Ok(())
    }
    pub async fn delete_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::Equations).await?;
        tbl.delete(&format!("id = \"{}\"", id))
            .await
            .map_err(|_| FlusterError::FailToDelete)?;
        Ok(())
    }
    pub async fn get_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<EquationModel> {
        let tbl = get_table(db, DatabaseTables::Equations).await?;
        let res = tbl
            .query()
            .only_if(format!("id = \"{}\"", id))
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        if res.is_empty() {
            return Err(FlusterError::FailToFind);
        }

        if res.len() > 1 {
            return Err(FlusterError::DuplicateId);
        }

        let batch = res.index(0);
        let items: Vec<EquationModel> =
            from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;

        match items.len() {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(items.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
    pub async fn get_many(db: &FlusterDb<'_>) -> FlusterResult<Vec<EquationModel>> {
        let tbl = get_table(db, DatabaseTables::Equations).await?;
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
        let mut items: Vec<EquationModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<EquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<EquationModel> for EquationEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("label", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new("desc", DataType::Utf8, true),
            Field::new("ctime", DataType::Date64, false),
            Field::new("utime", DataType::Date64, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let label = arrow_array::StringArray::from(vec![item.label.clone()]);
        let body = arrow_array::StringArray::from(vec![item.body.clone()]);
        let desc = arrow_array::StringArray::from(vec![item.desc.clone()]);
        let ctime = Date64Array::from(vec![item.ctime]);
        let utime = Date64Array::from(vec![item.utime]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(equation_id),
                Arc::new(label),
                Arc::new(body),
                Arc::new(desc),
                Arc::new(ctime),
                Arc::new(utime),
            ],
        )
        .unwrap()
    }
}
