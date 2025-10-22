use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
    utils::date_utils::parse_date,
};
use arrow_array::{RecordBatch, RecordBatchIterator, StringArray, TimestampMillisecondArray};
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
    /// The equation_id field maps to the user defined id.
    pub async fn equation_id_exists(db: &FlusterDb<'_>, equation_id: &str) -> FlusterResult<bool> {
        let items =
            EquationEntity::get_by_user_provided_ids(db, vec![equation_id.to_string()]).await?;
        Ok(!items.is_empty())
    }
    pub async fn get_by_user_provided_ids(
        db: &FlusterDb<'_>,
        ids: Vec<String>,
    ) -> FlusterResult<Vec<EquationModel>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::Equation).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("equation_id in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in EquationEntity.get_by_user_provided_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in EquationEntity.get_by_user_provided_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<EquationModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<EquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in EquationEntity.get_by_user_provided_ids: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_by_ids(
        db: &FlusterDb<'_>,
        ids: Vec<String>,
    ) -> FlusterResult<Vec<EquationModel>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::Equation).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("id in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in EquationEntity.get_by_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in EquationEntity.get_by_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<EquationModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<EquationModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in EquationEntity.get_by_ids: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<EquationModel>) -> FlusterResult<()> {
        let schema = EquationEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Equation).await?;
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
        let tbl = get_table(db, DatabaseTables::Equation).await?;
        tbl.delete(&format!("id = \"{}\"", id)).await.map_err(|e| {
            println!("Error in EquationEntity.delete_by_id: {:?}", e);
            FlusterError::FailToDelete
        })?;
        Ok(())
    }
    pub async fn get_by_id(db: &FlusterDb<'_>, id: String) -> FlusterResult<EquationModel> {
        let tbl = get_table(db, DatabaseTables::Equation).await?;
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
        let tbl = get_table(db, DatabaseTables::Equation).await?;
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
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
            Field::new(
                "utime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
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
        let ctime_value: i64 = parse_date(&item.ctime).unwrap();
        let utime_value: i64 = item.utime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let utime = TimestampMillisecondArray::from(vec![utime_value]);
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
