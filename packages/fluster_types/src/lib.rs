use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};
use surrealdb::Surreal;

pub type FlusterDb = AsyncPgConnection;
pub mod constants;
pub mod errors;
