use std::sync::LazyLock;

use serde::Deserialize;
pub use surrealdb::engine::local::Db;
pub use surrealdb::{engine::remote::ws::Client, RecordId, Surreal};

// TODO: THis is all left over from surreal. Now that we're not using this, clean up all references to this file and delete everything.

#[derive(Debug, Deserialize)]
pub struct DbRecord {
    pub id: RecordId,
}

pub type DbRecordOption = Option<DbRecord>;
