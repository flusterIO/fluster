use std::sync::LazyLock;

use serde::Deserialize;
use surrealdb::{engine::remote::ws::Client, RecordId, Surreal};


#[derive(Debug, Deserialize)]
pub struct DbRecord {
    pub id: RecordId,
}

pub type FlusterDb = Surreal<surrealdb::engine::local::Db>;

pub type DbRecordOption = Option<DbRecord>;

pub type FlusterDbResult<'a> = &'a Result<
    LazyLock<surrealdb::Surreal<surrealdb::engine::local::RocksDb>>,
    crate::errors::errors::FlusterError,
>;

pub type FlusterDbOptional = Result<LazyLock<Surreal<Client>>, crate::errors::errors::FlusterError>;
