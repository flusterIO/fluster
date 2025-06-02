use std::sync::Arc;

use arrow_array::{RecordBatch, RecordBatchIterator, StringArray};
use arrow_schema::{ArrowError, DataType, Field, Schema};

use crate::core::{
    database::{db::get_table, tables::table_paths::DatabaseTables},
    types::{
        errors::errors::{FlusterError, FlusterResult},
        traits::db_entity::DbEntity,
        FlusterDb,
    },
};

use super::equation_snippet_model::EquationSnippetModel;

pub struct EquationSnippetEntity {}

impl EquationSnippetEntity {
    pub async fn save(db: &FlusterDb<'_>, items: Vec<EquationSnippetModel>) -> FlusterResult<()> {
        let schema = EquationSnippetEntity::arrow_schema();
        let tbl = get_table(db, DatabaseTables::Equations).await?;
        let batches: Vec<Result<RecordBatch, ArrowError>> = items
            .iter()
            .map(|x| Ok(EquationSnippetEntity::to_record_batch(x, schema.clone())))
            .collect();
        let stream = Box::new(RecordBatchIterator::new(
            batches.into_iter(),
            schema.clone(),
        ));
        // RESUME: Come back here when back online and able to look at the docs for querying
        // with strings. This needs to turn into an upsert statement.
        // tbl.merge_insert(j)
        tbl.add(stream)
            .execute()
            .await
            .map_err(|_| FlusterError::FailToCreateEntity)?;
        Ok(())
    }

    pub async fn delete(db: &FlusterDb<'_>, data: EquationSnippetModel) -> FlusterResult<()> {
        let tbl = get_table(db, DatabaseTables::Equations).await?;
        tbl.delete(&format!(
            "equation_id = \"{}\" AND snippet_id = \"{}\"",
            data.equation_id, data.snippet_id
        ))
        .await
        .map_err(|_| FlusterError::FailToDelete)?;
        Ok(())
    }
}

impl DbEntity<EquationSnippetModel> for EquationSnippetEntity {
    fn arrow_schema() -> std::sync::Arc<arrow_schema::Schema> {
        Arc::new(Schema::new(vec![
            Field::new("equation_id", DataType::Utf8, false),
            Field::new("snippet_id", DataType::Utf8, false),
        ]))
    }

    fn to_record_batch(
        item: &EquationSnippetModel,
        schema: std::sync::Arc<arrow_schema::Schema>,
    ) -> arrow_array::RecordBatch {
        let equation_id = StringArray::from(vec![item.equation_id.clone()]);
        let snippet_id = StringArray::from(vec![item.snippet_id.clone()]);
        RecordBatch::try_new(schema, vec![Arc::new(equation_id), Arc::new(snippet_id)]).unwrap()
    }
}
