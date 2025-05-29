use std::sync::Arc;

use lancedb::{
    arrow::arrow_schema::{DataType, Field, Schema},
    Table,
};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

use super::{shared_taggable_schema::get_shared_taggable_schema, table_paths::DatabaseTables};

pub async fn create_topic_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = Arc::new(get_shared_taggable_schema());
    db.create_empty_table(DatabaseTables::Topics.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
