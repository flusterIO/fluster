use lancedb::Table;

use crate::core::{
    models::taggable::tag_model::Tag,
    types::errors::errors::{FlusterError, FlusterResult},
};

use super::table_paths::DatabaseTables;

pub async fn create_tag_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = Tag::arrow_schema();
    db.create_empty_table(DatabaseTables::Tags.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
