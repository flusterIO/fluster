use lancedb::Table;

use crate::{
    core::types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
    },
    features::settings::settings_entity::SettingsEntity,
};

use super::table_paths::DatabaseTables;

pub async fn create_setting_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = SettingsEntity::arrow_schema();
    db.create_empty_table(DatabaseTables::Settings.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
