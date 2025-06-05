use std::sync::Arc;

use arrow_array::{Date64Array, RecordBatch, StringArray, TimestampMillisecondArray};
use arrow_schema::{DataType, Field, Schema};

use super::bib_entry_model::BibEntryModel;
use crate::core::{
    database::tables::table_paths::DatabaseTables,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

pub struct BibEntryEntity {}

impl DbEntity<BibEntryModel> for BibEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, false),
            Field::new("data", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, Some("Utc".into())),
                true,
            ),
        ]))
    }

    fn to_record_batch(
        item: &BibEntryModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let data = StringArray::from(vec![item.data.clone()]);
        let ctime = TimestampMillisecondArray::from(vec![item.ctime.timestamp_millis()]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(user_provided_id),
                Arc::new(data),
                Arc::new(ctime),
            ],
        )
        .unwrap()
    }
}
