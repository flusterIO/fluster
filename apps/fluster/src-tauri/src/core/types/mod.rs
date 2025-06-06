use lancedb::Connection;
use tokio::sync::MutexGuard;

pub type FlusterDbRaw = Connection;

pub type FlusterDb<'a> = MutexGuard<'a, FlusterDbRaw>;
pub mod common_structs;
pub mod constants;
pub mod enums;
pub mod errors;
pub mod traits;
