use surrealdb::Surreal;

pub type FlusterDb = Surreal<surrealdb::engine::local::Db>;
pub mod constants;
pub mod enums;
pub mod errors;
