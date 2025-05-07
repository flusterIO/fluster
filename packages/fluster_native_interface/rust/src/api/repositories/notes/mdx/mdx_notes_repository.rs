use fluster_db::api::db::{get_database, FlusterError};
pub use fluster_types::constants::database_constants::MDX_NOTE_TABLE_NAME;
use flutter_rust_bridge::frb;

use crate::api::embedded_ts::MdxNoteEntity;

use super::query_params::MdxNoteQueryParams;

pub struct MdxNotesRepository {
    pub table_name: String,
}

impl MdxNotesRepository {
    pub fn new() -> MdxNotesRepository {
        MdxNotesRepository {
            table_name: String::from(MDX_NOTE_TABLE_NAME),
        }
    }

    #[frb(name = "search")]
    async fn search(
        &self,
        query: MdxNoteQueryParams,
    ) -> Result<Vec<MdxNoteEntity>, fluster_db::api::db::FlusterError> {
        let db = get_database().await;
        if db.is_err() {
            log::error!("Failed to load database");
            Err(fluster_db::api::db::FlusterError::FailToConnect)
        } else {
            let sql = r#"DEFINE ANALYZER mdx_analyzer TOKENIZERS blank,class,camel,punct FILTERS snowball($language);
DEFINE INDEX note_title ON $mdx_table FIELDS title SEARCH ANALYZER mdx_analyzer BM25(1.2,0.75);
DEFINE INDEX note_body ON $mdx_table FIELDS body SEARCH ANALYZER mdx_analyzer BM25(1.2,0.75) HIGHLIGHTS;
SELECT
  id,
  title,
  search::highlight('<b>', '</b>', 1) AS content_highlighted,
  search::score(0) * 2 + search::score(1) * 1 AS score
FROM $mdx_table
WHERE title @0@ 'network configuration'
   OR body @1@ 'network configuration'
ORDER BY score DESC
LIMIT 10
"#;
            let notes: Result<surrealdb::Response, surrealdb::Error> = db
                .unwrap()
                .query(sql)
                .bind(("mdx_table", MDX_NOTE_TABLE_NAME))
                .bind(("language", query.language))
                .bind(("query", query.query))
                .await;
            if notes.is_err() {
                Err(FlusterError::FailToFind)
            } else {
                let n: Result<Vec<MdxNoteEntity>, surrealdb::Error> = notes.unwrap().take(4);
                if let Ok(data) = n {
                    Ok(data)
                } else {
                    Err(FlusterError::FailToFind)
                }
            }
        }
    }
}

impl Default for MdxNotesRepository {
    fn default() -> Self {
        Self::new()
    }
}
