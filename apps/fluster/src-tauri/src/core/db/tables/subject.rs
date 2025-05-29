use std::sync::Arc;

use lancedb::{
    arrow::arrow_schema::{DataType, Field, Schema},
    Table,
};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};

use super::table_paths::DatabaseTables;

pub async fn create_subject_table(db: &lancedb::Connection) -> FlusterResult<Table> {
    let schema = Arc::new(Schema::new(vec![
        Field::new("value", DataType::Utf8, false),
        Field::new("ctime", DataType::Date64, false),
        Field::new(
            "vector",
            DataType::FixedSizeList(
                Arc::new(Field::new("item", DataType::Float32, true)),
                vector_dim,
            ),
            true, // Vectors can be nullable if you intend to have some entries without embeddings
        ),
    ]));
    db.create_empty_table(DatabaseTables::Subjects.to_string(), schema)
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}
