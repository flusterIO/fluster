use fluster_types::FlusterDb;
use log::error;

#[derive(rust_embed::Embed)]
#[folder = "src/api/schema"]
pub struct EmbeddedSchema;

pub async fn seed_schema(db: &FlusterDb) {
    let schema_data = EmbeddedSchema::get("schema.surql")
        .expect("Failed to load database schema")
        .data;

    let q = schema_data.to_vec();
    if let Ok(schema) = std::str::from_utf8(&q) {
        let res = db.query(schema).await;
        if res.is_err() {
            error!("Failed to seed database schema.");
        }
    }
}
