use diesel_async::AsyncPgConnection;

pub type FlusterDb = AsyncPgConnection;
pub mod constants;
pub mod enums;
pub mod errors;
