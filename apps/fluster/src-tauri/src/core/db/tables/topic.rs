use lancedb::Table;

use crate::core::{
    models::taggable::topic_entity::TopicEntity,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
    },
};

use super::table_paths::DatabaseTables;

pub async fn create_topic_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = TopicEntity::arrow_schema();
    db.create_empty_table(DatabaseTables::Topics.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
