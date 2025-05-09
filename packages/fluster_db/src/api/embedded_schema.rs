use log::error;

use super::{db::get_database, utils::get_database_path};

#[derive(rust_embed::Embed)]
#[folder = "src/api/schema"]
pub struct EmbeddedSchema;

pub async fn seed_schema() {
    let db = get_database().await.expect("Failed to get database.");
    let schema_data = EmbeddedSchema::get("schema.surql")
        .expect("Failed to load database schema")
        .data;

    let q = schema_data.to_vec();
    if let Ok(schema) = std::str::from_utf8(&q) {
        let res = db.use_db("notes").await;
        if res.is_err() {
            error!("Failed to seed database schema.");
        }
        let res = db.query(schema).await;
        if res.is_err() {
            error!("Failed to seed database schema.");
        }
    } else {
        println!("Failed to convert schema to a string.");
    }
}
