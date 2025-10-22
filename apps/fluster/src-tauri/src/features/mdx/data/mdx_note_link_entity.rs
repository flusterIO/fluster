use std::{ops::Index, sync::Arc};

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};
use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use regex::Regex;
use serde_arrow::from_record_batch;

use crate::{
    core::{
        database::{db::get_table, tables::table_paths::DatabaseTables},
        types::{
            common_structs::parsed_content_result::ParsedContentResult,
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
            FlusterDb,
        },
    },
    features::search::types::PaginationProps,
};

use super::mdx_note_link_model::MdxNoteLinkModel;

pub struct MdxNoteLinkEntity {}

impl MdxNoteLinkEntity {
    pub fn get_regex(&self) -> Regex {
        Regex::new(r#"\[eq:(?<equation_id>[^\]]+)\]\(note:(?<note_id>[^\)])\)"#)
            .expect("Creates regex without throwing an error.")
    }

    pub async fn get_by_file_paths_from(
        db: &FlusterDb<'_>,
        file_paths: &[String],
    ) -> FlusterResult<Vec<T>> {
        if file_paths.is_empty() {
            return Ok(Vec::new());
        }
        let tbl = get_table(db, DatabaseTables::MdxNoteLink).await?;
        let file_paths_string = file_paths
            .iter()
            .map(|x| format!("\"{}\"", x))
            .collect::<Vec<String>>()
            .join(", ");
        let items_batch = tbl
            .query()
            .only_if(format!(
                "mdx_note_file_path_from in ({})",
                file_paths_string
            ))
            .execute()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteLinkEntity.get_by_file_paths_from: {:?}", e);
                FlusterError::FailToConnect
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error in MdxNoteLinkEntity.get_by_file_paths_from: {:?}", e);
                FlusterError::FailToConnect
            })?;
        // let batches = &items_batch;
        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();

        for batch in items_batch.iter() {
            let data: Vec<T> = from_record_batch(batch).map_err(|e| {
                println!("Error in MdxNoteLinkEntity.get_by_file_paths_from: {:?}", e);
                FlusterError::FailToSerialize
            })?;
            items.extend(data);
        }
        Ok(items)
    }
    pub fn parse_mdx(
        &self,
        content: &str,
        from_file_path: &str,
    ) -> crate::core::types::common_structs::parsed_content_result::ParsedContentResult<
        MdxNoteLinkModel,
    > {
        let regex = self.get_regex();
        let mut new_content = content.to_string();
        let mut note_links: Vec<MdxNoteLinkModel> = Vec::new();
        for regex_match in regex.captures_iter(content) {
            let (match_content, groups): (&str, [&str; 1]) = regex_match.extract();
            let body = *groups.index(0);
            let note_id = *groups.index(1);
            if !body.is_empty() && !note_id.is_empty() {
                new_content = new_content.replace(
                    match_content,
                    &format!(
                        r#"<MdxNoteLinkById id='{}'>
{}
</MdxNoteLinkById>"#,
                        note_id, body
                    ),
                );
                note_links.push(MdxNoteLinkModel {
                    mdx_note_file_path_from: from_file_path.to_string(),
                    mdx_user_provided_id_to: note_id.to_string(),
                })
            }
        }
        ParsedContentResult {
            new_content,
            results: note_links,
        }
    }
}

impl DbEntity<MdxNoteLinkModel> for MdxNoteLinkEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("mdx_note_file_path_from", DataType::Utf8, false),
            Field::new("mdx_user_provided_id_to", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &MdxNoteLinkModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let mdx_note_from = StringArray::from(vec![item.mdx_note_file_path_from.clone()]);
        let mdx_note_to = StringArray::from(vec![item.mdx_user_provided_id_to.clone()]);

        RecordBatch::try_new(schema, vec![Arc::new(mdx_note_from), Arc::new(mdx_note_to)]).unwrap()
    }
}

type T = MdxNoteLinkModel;

impl MdxNoteLinkEntity {
    fn table() -> DatabaseTables {
        DatabaseTables::MdxNoteLink
    }

    pub async fn get_all(
        db: &FlusterDb<'_>,
        pagination: PaginationProps,
        predicate: Option<String>,
    ) -> FlusterResult<Vec<T>> {
        let tbl = get_table(db, MdxNoteLinkEntity::table()).await?;
        let offset = pagination.per_page * (pagination.page_number - 1);
        let mut q = tbl.query();
        if predicate.is_some() {
            q = q.only_if(predicate.unwrap());
        }
        let items_batch = q
            .offset(offset)
            .limit(pagination.per_page)
            .execute()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFind
            })?
            .try_collect::<Vec<_>>()
            .await
            .map_err(|e| {
                println!("Error: {:?}", e);
                FlusterError::FailToFind
            })?;

        if items_batch.is_empty() {
            return Ok(Vec::new());
        }
        let mut items: Vec<T> = Vec::new();
        for batch in items_batch.iter() {
            let data: Vec<T> =
                from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
            items.extend(data);
        }
        Ok(items)
    }

    pub async fn delete(db: &FlusterDb<'_>, predicate: String) -> FlusterResult<()> {
        let tbl = get_table(db, MdxNoteLinkEntity::table()).await?;
        tbl.delete(&predicate).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToDelete
        })?;

        Ok(())
    }

    pub async fn create_many(db: &FlusterDb<'_>, items: Vec<T>) -> FlusterResult<()> {
        let all_note_tags = MdxNoteLinkEntity::get_all(
            db,
            PaginationProps {
                per_page: 9999999,
                page_number: 1,
            },
            None,
        )
        .await?;
        // TODO:  This can be collapsed into one loop.
        let filtered_items: Vec<&T> = items
            .iter()
            .filter(|x| {
                !all_note_tags.iter().any(|y| {
                    (x.mdx_note_file_path_from == y.mdx_note_file_path_from)
                        && (x.mdx_user_provided_id_to == y.mdx_user_provided_id_to)
                })
            })
            .collect();
        let schema = MdxNoteLinkEntity::arrow_schema();
        let tbl = get_table(db, MdxNoteLinkEntity::table()).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = filtered_items
            .iter()
            .map(|x| Ok(MdxNoteLinkEntity::to_record_batch(x, schema.clone())))
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
}
