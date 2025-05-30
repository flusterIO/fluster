use arrow_array::{Date64Array, RecordBatch};
use arrow_schema::{DataType, Field, Schema};
use chrono::TimeZone;
use gray_matter::{ParsedEntity, Pod};
use rayon::iter::IntoParallelRefIterator;
use rayon::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::core::types::traits::db_entity::DbEntity;

use super::shared_taggable_model::SharedTaggableModel;

#[derive(Deserialize, Serialize, Clone)]
pub struct TagEntity {}

pub struct TagFromContentResult {
    pub tags: Vec<SharedTaggableModel>,
    pub parsed_content: String,
}

impl TagEntity {
    pub fn get_tag_regular_expression() -> Regex {
        Regex::new(r"\[\[#(?<body>[^#]+)\]\]").unwrap()
    }
    fn handle_arr_data<'a>(
        d: &Pod,
        taggables: &Vec<SharedTaggableModel>,
    ) -> Vec<SharedTaggableModel> {
        let mut tags = taggables.clone();
        if !d.is_empty() {
            let res = d.as_vec();
            if res.is_ok() {
                res.unwrap()
                    .iter()
                    .map(|x| {
                        let s = x.as_string();
                        if s.is_ok() {
                            tags.push(SharedTaggableModel::new(s.unwrap(), None))
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
    fn to_record_batch(&self, item: &SharedTaggableModel, schema: Arc<Schema>) -> RecordBatch {
        let ctime = Date64Array::from(vec![item.ctime.timestamp_millis()]);
        let text_array = arrow_array::StringArray::from(vec![item.value.clone()]);
        // Create the vector array
        RecordBatch::try_new(schema, vec![Arc::new(text_array), Arc::new(ctime)]).unwrap()
    }
    fn arrow_schema() -> Arc<Schema> {
        Arc::new(Schema::new(vec![
            Field::new("value", DataType::Utf8, false),
            Field::new("ctime", DataType::Date64, false),
            // Field::new(
            //     "vector",
            //     DataType::FixedSizeList(
            //         Arc::new(Field::new("item", DataType::Float32, true)),
            //         vector_dim,
            //     ),
            //     true, // Vectors can be nullable if you intend to have some entries without embeddings
            // ),
        ]))
    }
}

#[cfg(test)]
mod tests {
    use arrow_array::{RecordBatchIterator, RecordBatchReader};

    use crate::core::db::{db::get_database, tables::table_paths::DatabaseTables};

    use super::*;

    #[tokio::test]
    async fn saves_tag() {
        let test_tag = SharedTaggableModel::new("test tag".to_string(), None);
        let db_res = get_database().await;
        let db = db_res.lock().await;
        let schema = TagEntity::arrow_schema();
        let tbl = db
            .open_table(DatabaseTables::Tags.to_string())
            .execute()
            .await
            .expect("Opens tag table without throwing an error.");
        let tbl_manager = TagEntity {};
        let initial_batches = vec![Ok(tbl_manager.to_record_batch(&test_tag, schema.clone()))];
        let stream = Box::new(RecordBatchIterator::new(
            initial_batches.into_iter(),
            schema.clone(),
        )) as Box<dyn RecordBatchReader + Send>;
        let res = tbl.add(stream).execute().await;
        println!("Res: {:?}", res);
        assert!(res.is_ok(), "Saves tag without throwing an error.");
    }
}
