use lancedb::{
    arrow::arrow_schema::{DataType, Field, Schema},
    Table,
};

pub fn get_shared_taggable_schema() -> Schema {
    Schema::new(vec![
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
    ])
}

