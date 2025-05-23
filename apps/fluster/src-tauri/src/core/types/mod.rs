use pg_embed::postgres::PgEmbed;
use tokio::sync::MutexGuard;

pub type FlusterDb<'a> = MutexGuard<'a, PgEmbed>;
pub mod constants;
pub mod enums;
pub mod errors;
pub mod traits;
