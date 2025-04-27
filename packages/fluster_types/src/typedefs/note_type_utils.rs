use std::sync::LazyLock;

use serde::Deserialize;
use surrealdb::{
    engine::{any::IntoEndpoint, local::RocksDb, remote::ws::Client},
    RecordId, Surreal,
};

use crate::errors::database_errors;

#[derive(Debug, Deserialize)]
pub struct DbRecord {
    pub id: RecordId,
}

pub type DbRecordOption = Option<DbRecord>;

pub type FlusterDbResult<'a> = &'a Result<
    LazyLock<surrealdb::Surreal<surrealdb::engine::local::RocksDb>>,
    crate::errors::database_errors::DatabaseError,
>;

pub type FlusterDbOptional = Result<LazyLock<Surreal<Client>>, database_errors::DatabaseError>;
