use arrow_array::{
    types::Float32Type, FixedSizeListArray, RecordBatch, RecordBatchIterator, StringArray,
};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use std::{ops::Index, sync::Arc};

use crate::{
    core::{
        database::{db::get_table, tables::table_paths::DatabaseTables},
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::VectorDbEntity,
            FlusterDb,
        },
    },
    features::ai::data::models::vector::vector_model::VectorModel,
};

pub struct VectorEntity {}

impl VectorEntity {
    pub async fn save_many(db: &FlusterDb<'_>, entries: &[VectorModel]) -> FlusterResult<()> {
        let schema = VectorEntity::arrow_schema(entries.index(0).vec.len() as i32);
        let tbl = get_table(db, DatabaseTables::Vector).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = entries
            .iter()
            .map(|x| Ok(VectorEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&'static str; 1] = &["id"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
        Ok(())
    }
}

impl VectorDbEntity<VectorModel> for VectorEntity {
    fn arrow_schema(vector_dimensions: i32) -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("source", DataType::Utf8, false),
            Field::new("content", DataType::Utf8, false),
            Field::new("data", DataType::Utf8, false),
            Field::new(
                "vec",
                DataType::FixedSizeList(
                    Field::new("item", DataType::Float32, true).into(),
                    vector_dimensions,
                ),
                true,
            ),
        ]))
    }

    fn to_record_batch(
        item: &VectorModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let source = StringArray::from(vec![item.source.to_string()]);
        let content = StringArray::from(vec![item.content.clone()]);
        let data = StringArray::from(vec![item.data.clone()]);

        let vec = FixedSizeListArray::from_iter_primitive::<Float32Type, _, _>(
            vec![Some(item.vec.iter().map(|x| Some(*x)))],
            item.vec.len() as i32,
        );

        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(source),
                Arc::new(content),
                Arc::new(data),
                Arc::new(vec),
            ],
        )
        .unwrap()
    }
}
