use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde::{Deserialize, Serialize};
use serde_arrow::from_record_batch;
use std::{ops::Index, sync::Arc};

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    models::settings::settings::Settings,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::settings_model::SettingsModel;

#[derive(Deserialize, Serialize, Clone)]
pub struct SettingsEntity {}

impl SettingsEntity {
    pub async fn save(
        db: &FlusterDb<'_>,
        json_string: String,
        settings_id: String,
    ) -> FlusterResult<()> {
        let data = SettingsModel {
            body: json_string,
            id: settings_id,
        };
        let tbl = db
            .open_table(DatabaseTables::Settings.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToSaveSettings)?;
        let schema = SettingsEntity::arrow_schema();
        let batches: Vec<Result<RecordBatch, ArrowError>> =
            vec![Ok(SettingsEntity::to_record_batch(&data, schema.clone()))];
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
            .map_err(|_| FlusterError::FailToSaveSettings)?;
        Ok(())
    }

    pub async fn delete_settings(db: &FlusterDb<'_>, settings_id: String) -> FlusterResult<()> {
        let tbl = db
            .open_table(DatabaseTables::Settings.to_string())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToSaveSettings)?;
        tbl.delete(&format!("id = {}", settings_id))
            .await
            .map_err(|_| FlusterError::FailToDelete)?;
        Ok(())
    }

    pub async fn get_settings(db: &FlusterDb<'_>, settings_id: String) -> FlusterResult<String> {
        let tbl = get_table(db, DatabaseTables::Settings).await?;
        let res = tbl
            .query()
            // .only_if(format!("id = {}", settings_id))
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

        if res.is_empty() {
            println!("No settings found.");
            return Err(FlusterError::FailToReadSettings);
        } else {
            let batch = res.index(0);
            let items: Vec<SettingsModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            println!("Items: {:?}", items.len());
            if !items.is_empty() {
                return Ok(items.index(0).body.clone());
            }
        }
        Err(FlusterError::FailToReadSettings)
    }
}

impl DbEntity<SettingsModel> for SettingsEntity {
    fn to_record_batch(item: &SettingsModel, schema: Arc<Schema>) -> RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let body = StringArray::from(vec![item.body.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(id), Arc::new(body)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
        ]))
    }
}

#[cfg(test)]
mod tests {

    use crate::core::database::db::get_database;

    use super::*;

    #[tokio::test]
    async fn gets_settings() {
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let res = SettingsEntity::get_settings(&db, "appState".to_string()).await;

        println!("Response: {:?}", res);

        assert!(res.is_ok(), "Returns settings without throwing an error");
    }
}
