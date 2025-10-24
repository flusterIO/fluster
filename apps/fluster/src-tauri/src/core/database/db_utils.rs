use std::sync::Arc;

use arrow_schema::Schema;

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        FlusterDb,
    },
};

pub async fn table_exists(db: &FlusterDb<'_>, table: &DatabaseTables) -> bool {
    if let Ok(existing_tables) = db.table_names().execute().await {
        existing_tables.iter().any(|x| x == &table.to_string())
    } else {
        false
    }
}

pub async fn drop_table_if_exist(db: &FlusterDb<'_>, table: DatabaseTables) -> FlusterResult<()> {
    if table_exists(db, &table).await {
        db.drop_table(table.to_string())
            .await
            .map_err(|_| FlusterError::FailToDropTable)?;
    }
    Ok(())
}

pub async fn create_table_if_not_exist(
    db: &FlusterDb<'_>,
    table: DatabaseTables,
    schema: &Arc<Schema>,
) -> FlusterResult<()> {
    if !table_exists(db, &table).await {
        db.create_empty_table(table.to_string(), schema.clone())
            .mode(lancedb::database::CreateTableMode::Create)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToCreateTable)?;
    }
    Ok(())
}
