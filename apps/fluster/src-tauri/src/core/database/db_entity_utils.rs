use futures::TryStreamExt;
use lancedb::query::{ExecutableQuery, QueryBase};
use serde::Deserialize;
use serde_arrow::from_record_batch;

use crate::core::types::{
    errors::errors::{FlusterError, FlusterResult},
    FlusterDb,
};

use super::{db::get_table, tables::table_paths::DatabaseTables};

pub async fn get_many<'a, ResultType: Deserialize<'a>>(
    db: FlusterDb<'_>,
    predicate: Option<String>,
    table: DatabaseTables,
) -> FlusterResult<Vec<ResultType>> {
    let tbl = get_table(&db, table).await?;
    let query = match predicate {
        None => tbl.query(),
        Some(x) => tbl.query().only_if(x),
    };
    let items_batch = query
        .execute()
        .await
        .map_err(|_| FlusterError::FailToConnect)?
        .try_collect::<Vec<_>>()
        .await
        .map_err(|_| FlusterError::FailToFind)?;
    // let batches = &items_batch;
    if items_batch.is_empty() {
        return Ok(Vec::new());
    }
    // TODO: Fix this. Implement these generic database functions instead of doing this manuall for
    // every entity.
    // let batches = items_batch.clone();
    // let items: Vec<ResultType> =
    //     from_record_batch(items_batch).map_err(|_| FlusterError::FailToSerialize)?;
    //

    // let mut items: Vec<ResultType> = Vec::new();
    // for batch in items_batch.iter() {
    //     let data: Vec<ResultType> =
    //         from_record_batch(batch).map_err(|_| FlusterError::FailToSerialize)?;
    //     items.extend(data);
    // }
    Err(FlusterError::NotImplemented)
}
