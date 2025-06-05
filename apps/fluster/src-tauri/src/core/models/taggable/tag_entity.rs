use arrow_array::{Date64Array, RecordBatch, RecordBatchIterator, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use gray_matter::{ParsedEntity, Pod};
use rayon::iter::IntoParallelRefIterator;
use rayon::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::core::{
    database::db::get_table,
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::{shared_taggable_model::SharedTaggableModel, types::TagFromContentResult};

#[derive(Deserialize, Serialize, Clone)]
pub struct TagEntity {}

impl TagEntity {
    pub async fn save_many(
        items: Vec<SharedTaggableModel>,
        db: FlusterDb<'_>,
    ) -> FlusterResult<()> {
        // FIXME: This method will fail. There is no id field. This should instead check the value and insert only if it does not exist.
        let schema = TagEntity::arrow_schema();
        let tbl = get_table(
            &db,
            crate::core::database::tables::table_paths::DatabaseTables::Tags,
        )
        .await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(TagEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&str] = &["value"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|_| FlusterError::FailToCreateTag)?;

        Ok(())
    }
    pub fn get_tag_regular_expression() -> Regex {
        Regex::new(r"\[\[#(?<body>[^#]+)\]\]").unwrap()
    }
    fn handle_arr_data(d: &Pod, taggables: &Vec<SharedTaggableModel>) -> Vec<SharedTaggableModel> {
        let mut tags = taggables.clone();
        if !d.is_empty() {
            let res = d.as_vec();
            if let Ok(_res) = res {
                _res.iter()
                    .map(|x| {
                        if let Ok(s) = x.as_string() {
                            tags.push(SharedTaggableModel::new(s, None));
                        }
                    })
                    .collect()
            }
        }
        tags
    }
    pub fn from_pod_data(data: &ParsedEntity) -> Vec<SharedTaggableModel> {
        let mut tags: Vec<SharedTaggableModel> = Vec::new();
        if let Some(parsed_data) = &data.data {
            if let Ok(h) = parsed_data.as_hashmap() {
                if h.contains_key("tags") {
                    tags = TagEntity::handle_arr_data(&h["tags"], &tags);
                }
            }
        }
        tags
    }
    pub fn from_mdx_content(data: &ParsedEntity) -> TagFromContentResult {
        let mut tags: Vec<SharedTaggableModel> = TagEntity::from_pod_data(&data);
        let r = TagEntity::get_tag_regular_expression();
        let mut new_content = String::from(&data.content);
        for result in r.captures_iter(&data.content) {
            if let Some(body) = result.get(1) {
                let body_as_string = body.as_str();
                if !tags
                    .par_iter()
                    .any(|tag_item| tag_item.value == body_as_string)
                {
                    tags.push(SharedTaggableModel::new(body_as_string.to_string(), None));
                    new_content = new_content.replace(
                        &format!("[[#{}]]", body_as_string),
                        &format!("<Tag value={{\"{}\"}} />", body_as_string),
                    );
                }
            }
        }
        TagFromContentResult {
            tags,
            parsed_content: new_content,
        }
    }
}

impl DbEntity<SharedTaggableModel> for TagEntity {
    fn to_record_batch(item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime = TimestampMillisecondArray::from(vec![item.ctime.timestamp_millis()]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, Some("Utc".into())),
                false,
            ),
        ]))
    }
}
