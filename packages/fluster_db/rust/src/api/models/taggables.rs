use serde::{Deserialize, Serialize};

use surrealdb::engine::remote::ws::Ws;
use surrealdb::opt::auth::Root;
use surrealdb::{Error, Surreal};

#[derive(Debug, Serialize, Deserialize)]
pub struct Tag {
    pub id: Option<surealdb::sql::Thing>,
    pub value: String,
}
