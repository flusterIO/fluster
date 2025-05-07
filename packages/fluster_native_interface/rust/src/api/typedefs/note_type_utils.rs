use std::sync::LazyLock;

use serde::Deserialize;
pub use surrealdb::engine::local::Db;
pub use surrealdb::{engine::remote::ws::Client, RecordId, Surreal};

#[derive(Debug, Deserialize)]
pub struct DbRecord {
    pub id: RecordId,
}

pub type FlusterDb = Surreal<Db>;

pub type DbRecordOption = Option<DbRecord>;

pub type FlusterDbResult<'a> = &'a Result<
    LazyLock<surrealdb::Surreal<surrealdb::engine::local::RocksDb>>,
    fluster_types::errors::errors::FlusterError,
>;

pub type FlusterDbOptional =
    Result<LazyLock<Surreal<Client>>, fluster_types::errors::errors::FlusterError>;
