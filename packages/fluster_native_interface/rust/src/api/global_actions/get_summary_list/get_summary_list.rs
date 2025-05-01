use fluster_db::api::db::get_database;
use fluster_types::constants::database_constants::{
    FLUSTER_NAMESPACE, MDX_NOTE_TABLE_NAME, NOTES_DATABASE_NAME,
};
pub use fluster_types::errors::database_errors::DatabaseError;
pub use fluster_types::typedefs::note_type_utils::FlusterDb;

use crate::api::global_actions::get_summary_list::summary_types::mdx_note_summary::{
    self, MdxNoteSummary,
};

use super::{summary_list_query::SummaryListQuery, summary_list_result::SummaryListResults};

pub async fn get_summary_list(
    query: SummaryListQuery,
) -> Result<SummaryListResults, DatabaseError> {
    let notes_sql = format!("SELECT * FROM {}", MDX_NOTE_TABLE_NAME);
    let db = get_database().await;
    if db.is_err() {
        return Err(DatabaseError::FailToConnect);
    }
    let mut results = SummaryListResults::default();
    let db_err = db
        .as_ref()
        .unwrap()
        .use_ns(FLUSTER_NAMESPACE)
        .use_db(NOTES_DATABASE_NAME)
        .await;
    if db_err.is_err() {
        return Err(DatabaseError::FailToFind);
    }
    let result: Result<surrealdb::Response, surrealdb::Error> =
        db.as_ref().unwrap().query(notes_sql).await;
    if result.is_err() {
        return Err(DatabaseError::FailToFind);
    } else {
        // RESUME: Pick back up here and figure out why this object prints values but this take
        // method always returns an empty array. Once this test passes, work on more rust stuff
        // while on wifi, because the flutter stuff should be more straight forward offline, and
        // there's quite a bit of extra rust add-ons you can do with llm related features offline.
        let mut res_items = result.unwrap();
        if let Ok(notes) = res_items.take::<Vec<MdxNoteSummary>>(20) {
            println!("Notes: {:?}", notes);
            results.mdx_notes = notes;
        }
        // if let Ok(mut items) = res_items.check() {
        //     // FIXME: Add pagination here. The take param works as an index *from* when specified
        //     let mdx_note_summaries: surrealdb::Result<Vec<MdxNoteSummary>> = items.take(5);
        //     println!("Notes: {:?}", &mdx_note_summaries);
        //     if mdx_note_summaries.is_ok() {
        //         results.mdx_notes = mdx_note_summaries.unwrap();
        //     } else {
        //         dbg!("Error: {:?}", mdx_note_summaries);
        //         return Err(DatabaseError::FailToFind);
        //     }
        // } else {
        //     return Err(DatabaseError::FailToFind);
        // }
    }
    Ok(results)
}

#[cfg(test)]
mod tests {
    use fluster_db::api::db::get_database;

    use super::*;

    #[tokio::test]
    async fn gets_list_of_summaries() {
        let query = SummaryListQuery::default();
        let db = get_database().await;
        assert!(db.is_ok(), "Database intialization returns no errors.");
        let summaries = get_summary_list(query).await;
        assert!(
            &summaries.is_ok(),
            "Returns a list of summaries without throwing an error"
        );
        assert!(
            !&summaries.unwrap().mdx_notes.is_empty(),
            "Returns a list that isn't empty."
        );
    }
}
