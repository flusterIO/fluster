use arrow_array::{RecordBatch, RecordBatchIterator, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use gray_matter::{ParsedEntity, Pod};
use lancedb::query::{ExecutableQuery, QueryBase};
use rayon::iter::IntoParallelRefIterator;
use rayon::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};
use serde_arrow::from_record_batch;
use std::sync::Arc;

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        common_structs::parsed_content_result::ParsedContentResult,
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::shared_taggable_model::SharedTaggableModel;

#[derive(Deserialize, Serialize, Clone)]
pub struct TagEntity {}

impl TagEntity {
    pub async fn get_by_values(
        db: &FlusterDb<'_>,
        ids: Vec<String>,
    ) -> FlusterResult<Vec<SharedTaggableModel>> {
        if ids.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::Tag).await?;
        let ids_string = ids
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("value in ({})", ids_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in TagEntity.get_by_values: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in TagEntity.get_by_values: {:?}", e);
                FlusterError::FailToFind
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SharedTaggableModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<SharedTaggableModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_many(db: &FlusterDb<'_>) -> FlusterResult<Vec<SharedTaggableModel>> {
        let tbl = get_table(db, DatabaseTables::Tag).await?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|e| {
                println!("Error in TagEntity.get_many: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in TagEntity.get_many: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<SharedTaggableModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<SharedTaggableModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in TagEntity.get_many: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn save_many(
        db: &FlusterDb<'_>,
        items: Vec<SharedTaggableModel>,
    ) -> FlusterResult<()> {
        let schema = TagEntity::arrow_schema(None);
        let tbl = get_table(db, DatabaseTables::Tag).await?;
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
            .map_err(|e| {
                println!("Error in taggable model: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;

        Ok(())
    }
    pub fn get_tag_regular_expression() -> Regex {
        Regex::new(r"\[\[#(?<body>[^\]]+)\]\]").unwrap()
    }
    fn handle_arr_data(d: &Pod, taggables: &[SharedTaggableModel]) -> Vec<SharedTaggableModel> {
        let mut tags = taggables.to_owned();
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
    pub fn from_mdx_content(data: &ParsedEntity) -> ParsedContentResult<SharedTaggableModel> {
        let mut tags: Vec<SharedTaggableModel> = TagEntity::from_pod_data(data);
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
        ParsedContentResult {
            results: tags,
            new_content,
        }
    }
}

impl DbEntity<SharedTaggableModel> for TagEntity {
    fn to_record_batch(item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema(_: Option<i32>) -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }
}
