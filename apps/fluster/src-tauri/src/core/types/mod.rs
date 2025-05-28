use postgresql_embedded::PostgreSQL;
use tokio::sync::MutexGuard;

pub type FlusterDb<'a> = MutexGuard<'a, PostgreSQL>;
pub mod constants;
pub mod enums;
pub mod errors;
pub mod traits;
