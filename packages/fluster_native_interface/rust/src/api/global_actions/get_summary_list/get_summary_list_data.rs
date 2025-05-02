use anyhow::Ok;
use fluster_db::api::db::get_database;
pub use fluster_models::models::notes::front_matter::front_matter_model::FrontMatter;
use fluster_types::constants::database_constants::{FLUSTER_NAMESPACE, NOTES_DATABASE_NAME};
pub use fluster_types::errors::database_errors::DatabaseError;
pub use fluster_types::typedefs::note_type_utils::FlusterDb;

pub use crate::api::global_actions::get_summary_list::summary_types::mdx_note_summary::MdxNoteSummary;

use super::{summary_list_query::SummaryListQuery, summary_list_result::SummaryListResults};

pub async fn get_summary_list(
    query: SummaryListQuery,
) -> Result<SummaryListResults, anyhow::Error> {
    let notes_sql = r#"
LET $notes = (SELECT front_matter, id from mdx_notes);
LET $summary_notes = $notes.map(|$mdx_note| {
    {
       id:  $mdx_note["id"],
       front_matter: $mdx_note["front_matter"],
    }
    });
RETURN {
    mdx_notes: $summary_notes,
};"#;
    let db = get_database().await?;
    let results = SummaryListResults::default();

    // if db.is_err() {
    //     return Err(surrealdb::Error::Api(Error));
    //     // return Err(DatabaseError::FailToConnect);
    // }
    db.use_ns(FLUSTER_NAMESPACE)
        .use_db(NOTES_DATABASE_NAME)
        .await?;
    let mut result = db.query(notes_sql).await?;
    let parsed_results: Vec<SummaryListResults> = result.take(2)?;
    if !&parsed_results.is_empty() {
        let item = parsed_results.first().unwrap();
        return Ok(item.to_owned());
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
