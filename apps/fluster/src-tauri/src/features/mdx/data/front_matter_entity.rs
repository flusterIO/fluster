use std::{ops::Index, sync::Arc};

use arrow_array::{
    types::GenericStringType, GenericByteArray, Int64Array, RecordBatch, RecordBatchIterator,
    StringArray,
};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde_arrow::from_record_batch;

use crate::{
    core::{
        database::{
            db::{clean_table, get_table},
            tables::table_paths::DatabaseTables,
        },
        models::taggable::shared_taggable_model::SharedTaggableModel,
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
            FlusterDb,
        },
    },
    features::search::types::{NoteSummary, PaginationProps},
};

use super::front_matter_model::{FrontMatterBaseModel, FrontMatterModel};

pub struct FrontMatterEntity {}

fn optional_shared_taggable_to_arrow(
    item: Option<SharedTaggableModel>,
) -> GenericByteArray<GenericStringType<i32>> {
    if item.is_none() {
        let v: Vec<Option<String>> = vec![None];
        StringArray::from(v)
    } else {
        StringArray::from(vec![item.unwrap().value.clone()])
    }
}

impl FrontMatterEntity {
    pub async fn get_by_user_provided_id(
        db: &FlusterDb<'_>,
        user_provided_id: &str,
    ) -> FlusterResult<FrontMatterModel> {
        let tbl = get_table(db, DatabaseTables::MdxNote).await?;
        let res = tbl
            .query()
            .only_if(format!("user_provided_id = \"{}\"", user_provided_id))
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        if res.is_empty() {
            return Err(FlusterError::FailToFind);
        }

        if res.len() > 1 {
            return Err(FlusterError::DuplicateId);
        }

        let batch = res.index(0);
        let items: Vec<FrontMatterModel> =
            from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;

        match items.len() {
            0 => Err(FlusterError::FailToFind),
            1 => Ok(items.index(0).clone()),
            _ => Err(FlusterError::DuplicateId),
        }
    }
    pub async fn get_by_file_paths(
        db: &FlusterDb<'_>,
        file_paths: &[String],
    ) -> FlusterResult<Vec<FrontMatterBaseModel>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::FrontMatter).await?;
        let file_paths_string = file_paths
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!("mdx_note_file_path in ({})", file_paths_string))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in FrontMatterEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in FrontMatterEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToFind
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<FrontMatterBaseModel> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<FrontMatterBaseModel> = from_record_batch(batch).map_err(|e| {
                println!("Error in FrontMatterEntity.get_by_file_paths: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub async fn clean(db: &FlusterDb<'_>) -> FlusterResult<()> {
        clean_table(db, DatabaseTables::FrontMatter).await
    }
    pub async fn save_many(db: &FlusterDb<'_>, items: Vec<FrontMatterModel>) -> FlusterResult<()> {
        // RESUME: Come back here to take care of the sync method.
        let schema = FrontMatterEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::FrontMatter).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(FrontMatterEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        let primary_key: &[&str] = &["mdx_note_file_path"];
        tbl.merge_insert(primary_key)
            .when_matched_update_all(None)
            .when_not_matched_insert_all()
            .clone()
            .execute(stream)
            .await
            .map_err(|e| {
                println!("Error in front matter: {:?}", e);
                FlusterError::FailToCreateEntity
            })?;
        Ok(())
    }
    pub async fn get_all(
        db: &FlusterDb<'_>,
        pagination: &PaginationProps,
    ) -> FlusterResult<Vec<NoteSummary>> {
        let front_matter_table = get_table(db, DatabaseTables::FrontMatter).await?;
        let offset = pagination.per_page * (pagination.page_number - 1);
        let items_batch = front_matter_table
            .query()
            .offset(offset)
            .limit(pagination.per_page)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToFind)?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|_| FlusterError::FailToFind)?;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<NoteSummary> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<FrontMatterBaseModel> = from_record_batch(batch).map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(
                data.iter()
                    .map(|x| NoteSummary {
                        title: x.title.clone(),
                        file_path: x.mdx_note_file_path.clone(),
                    })
                    .collect::<Vec<NoteSummary>>(),
            );
            // items.extend(data);
        }
        Ok(items)
    }
}

impl DbEntity<FrontMatterModel> for FrontMatterEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("id", DataType::Utf8, false),
            Field::new("mdx_note_file_path", DataType::Utf8, false),
            Field::new("user_provided_id", DataType::Utf8, true),
            Field::new("title", DataType::Utf8, false),
            Field::new("summary", DataType::Utf8, true),
            Field::new("list_id", DataType::Utf8, true),
            Field::new("list_index", DataType::Int64, true),
            Field::new("subject", DataType::Utf8, true),
            Field::new("topic", DataType::Utf8, true),
        ]))
    }

    fn to_record_batch(
        item: &FrontMatterModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let id = StringArray::from(vec![item.id.clone()]);
        let mdx_note_file_path = StringArray::from(vec![item.mdx_note_file_path.clone()]);
        let user_provided_id = StringArray::from(vec![item.user_provided_id.clone()]);
        let title = StringArray::from(vec![item.title.clone()]);
        let summary = StringArray::from(vec![item.summary.clone()]);
        let list_id = StringArray::from(vec![item.list_id.clone()]);
        let list_index = Int64Array::from(vec![item.list_index.unwrap_or(0)]);
        let subject = optional_shared_taggable_to_arrow(item.subject.clone());
        let topic = optional_shared_taggable_to_arrow(item.topic.clone());
        // Create the vector array
        RecordBatch::try_new(
            schema,
            vec![
                Arc::new(id),
                Arc::new(mdx_note_file_path),
                Arc::new(user_provided_id),
                Arc::new(title),
                Arc::new(summary),
                Arc::new(list_id),
                Arc::new(list_index),
                Arc::new(subject),
                Arc::new(topic),
            ],
        )
        .unwrap()
    }
}
