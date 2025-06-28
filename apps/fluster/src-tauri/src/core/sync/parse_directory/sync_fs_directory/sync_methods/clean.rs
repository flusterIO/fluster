use crate::core::{
    database::{db::clean_table, tables::table_paths::DatabaseTables},
    types::{errors::errors::FlusterResult, FlusterDb},
};

/// Removes all entities from the database that can be regenerated from mdx, bib or other
/// file system content.
pub async fn clean_database(db: &FlusterDb<'_>) -> FlusterResult<()> {
    let res = tokio::join!(
        clean_table(db, DatabaseTables::MdxNote),
        clean_table(db, DatabaseTables::FrontMatter),
        clean_table(db, DatabaseTables::DictionaryEntry),
        clean_table(db, DatabaseTables::MdxNoteTag),
        clean_table(db, DatabaseTables::MdxNoteTopic),
        clean_table(db, DatabaseTables::MdxNoteSubject),
        clean_table(db, DatabaseTables::MdxNoteSnippet),
        clean_table(db, DatabaseTables::MdxNoteSnippet),
        clean_table(db, DatabaseTables::MdxNoteEquation),
    );
    let (a, b, c, d, e, f, g, h, i) = res;
    if a.is_err() {
        return Err(a.err().unwrap());
    };

    if b.is_err() {
        return Err(b.err().unwrap());
    };
    if c.is_err() {
        return Err(c.err().unwrap());
    };
    if d.is_err() {
        return Err(d.err().unwrap());
    };
    if e.is_err() {
        return Err(e.err().unwrap());
    };
    if f.is_err() {
        return Err(f.err().unwrap());
    };
    if g.is_err() {
        return Err(g.err().unwrap());
    };
    if h.is_err() {
        return Err(h.err().unwrap());
    };
    if i.is_err() {
        return Err(i.err().unwrap());
    };
    Ok(())
}
