use lancedb::Table;

use crate::{
    core::types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
    },
    features::snippets::snippet_entity::SnippetEntity,
};

use super::table_paths::DatabaseTables;

pub async fn create_snippet_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = SnippetEntity::arrow_schema();
    db.create_empty_table(DatabaseTables::Snippets.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
