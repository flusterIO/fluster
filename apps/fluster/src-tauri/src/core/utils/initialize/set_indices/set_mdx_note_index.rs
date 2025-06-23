use lancedb::{index::scalar::FtsIndexBuilder, Connection};

use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub async fn set_mdx_note_body_index(db: &Connection) -> FlusterResult<()> {
    let tbl = db
        .open_table(DatabaseTables::MdxNote.to_string())
        .execute()
        .await
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCreateIndex
        })?;
    // FtsIndexBuilder::
    tbl.create_index(
        &["raw_body"],
        lancedb::index::Index::FTS(FtsIndexBuilder::default()),
    )
    .execute()
    .await
    .map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToCreateIndex
    })?;
    Ok(())
}
