use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};

pub type FlusterDb = AsyncPgConnection;
pub mod constants;
pub mod errors;
