use lancedb::Table;

use crate::core::{
    models::taggable::subject_entity::SubjectEntity,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
    },
};

use super::table_paths::DatabaseTables;

pub async fn create_subject_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = SubjectEntity::arrow_schema();
    db.create_empty_table(DatabaseTables::Subjects.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
