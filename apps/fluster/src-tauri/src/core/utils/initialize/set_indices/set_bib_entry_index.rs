use lancedb::{index::scalar::FtsIndexBuilder, Connection};

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub async fn set_bib_entry_index(db: &Connection) -> FlusterResult<()> {
    let tbl = db
        .open_table(DatabaseTables::BibEntry.to_string())
        .execute()
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCreateIndex
        })?;
    tbl.create_index(
        &["data"],
        lancedb::index::Index::FTS(FtsIndexBuilder {
            with_position: true,
            ..Default::default()
        }),
    )
    .execute()
    .await
    .map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateIndex
    })?;
    Ok(())
}
