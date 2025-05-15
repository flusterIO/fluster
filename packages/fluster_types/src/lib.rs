use diesel_async::AsyncPgConnection;

/// flutter_rust_bridge:ignore
pub type FlusterDb = AsyncPgConnection;
pub mod constants;
pub mod enums;
pub mod errors;
