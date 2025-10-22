use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, TimestampMillisecondArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::dictionary_entry_model::DictionaryEntryModel;

pub struct DictionaryEntryEntity {}

impl DictionaryEntryEntity {
    pub async fn create_many(
        db: &FlusterDb<'_>,
        items: Vec<DictionaryEntryModel>,
    ) -> FlusterResult<()> {
        let schema = DictionaryEntryEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::DictionaryEntry).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(DictionaryEntryEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        tbl.add(stream).execute().await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCreateEntity
        })?;
        Ok(())
    }
    pub async fn get_by_labels(
        db: &FlusterDb<'_>,
        labels: Vec<String>,
    ) -> FlusterResult<Vec<DictionaryEntryModel>> {
        if labels.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::DictionaryEntry).await?;
        let labels_string = labels
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("label in ({})", labels_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in DictionaryEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in DictionaryEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<DictionaryEntryModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<DictionaryEntryModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in DictionaryEntryEntity.get_by_ids: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn get_all(db: &FlusterDb<'_>) -> FlusterResult<Vec<DictionaryEntryModel>> {
        let tbl = get_table(db, DatabaseTables::DictionaryEntry).await?;
        let items_batch = tbl
            .query()
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<DictionaryEntryModel> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<DictionaryEntryModel> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<DictionaryEntryModel> for DictionaryEntryEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("label", DataType::Utf8, false),
            Field::new("body", DataType::Utf8, false),
            Field::new("mdx_source", DataType::Utf8, false),
            Field::new(
                "ctime",
                DataType::Timestamp(arrow_schema::TimeUnit::Millisecond, None),
                false,
            ),
        ]))
    }

    fn to_record_batch(
        item: &DictionaryEntryModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let label = arrow_array::StringArray::from(vec![item.label.clone()]);
        let body = arrow_array::StringArray::from(vec![item.body.clone()]);
        let mdx_source = arrow_array::StringArray::from(vec![item.mdx_source.clone()]);
        let ctime_value: i64 = item.ctime.parse().unwrap();
        let ctime = TimestampMillisecondArray::from(vec![ctime_value]);
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(label),
                Arc::new(body),
                Arc::new(mdx_source),
                Arc::new(ctime),
            ],
        )
        .unwrap()
    }
}

#[cfg(test)]
mod tests {
    use std::ops::Index;

    use gray_matter::{engine::YAML, Matter};

    use crate::{
        core::types::traits::mdx_parser::MdxParser,
        features::dictionary::dictionary_entry_parser::DictionaryEntryMdxParser,
    };

    #[test]
    fn parses_dictionary_entry() {
        let sample = r#"---
title: My note  
---

# My note 

```dictionary -- My entry 
# This is my dictionary entry.
```

```dictionary -- My other entry 
# This is my dictionary entry.
```
"#;

        let matter = Matter::<YAML>::new();
        let result = matter.parse(&sample);
        let res = DictionaryEntryMdxParser {}.parse_mdx(&result.content);
        println!("Res: {:?}", res);
        assert!(
            res.results.len() == 2,
            "Returns the proper number of dictionary entries."
        );
        assert!(
            res.results.index(0).label == "My entry",
            "Returns the proper title"
        );
        assert!(
            res.results.index(0).body == "# This is my dictionary entry.",
            "Returns the proper body"
        );
    }
}
