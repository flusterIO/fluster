use pg_embed::postgres::PgEmbed;

pub type FlusterDb = PgEmbed;
pub mod constants;
pub mod enums;
pub mod errors;
pub mod traits;
