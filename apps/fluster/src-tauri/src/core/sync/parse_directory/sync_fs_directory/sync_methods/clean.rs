use crate::core::{
    database::{db::clean_table, tables::table_paths::DatabaseTables},
    types::{errors::errors::FlusterResult, FlusterDb},
};

/// Removes all entities from the database that can be regenerated from mdx, bib or other
/// file system content.
pub async fn clean_database(db: &FlusterDb<'_>) -> FlusterResult<()> {
    clean_table(db, DatabaseTables::MdxNote).await?;
    clean_table(db, DatabaseTables::FrontMatter).await?;
    clean_table(db, DatabaseTables::MdxNoteTag).await?;
    clean_table(db, DatabaseTables::MdxNoteEquation).await?;
    clean_table(db, DatabaseTables::DictionaryEntry).await?;
    Ok(())
}
