use lancedb::Connection;
use postgresql_embedded::PostgreSQL;
use tokio::sync::MutexGuard;

pub type FlusterDbRaw = Connection;

pub type FlusterDb<'a> = MutexGuard<'a, FlusterDbRaw>;
pub mod constants;
pub mod enums;
pub mod errors;
pub mod traits;
