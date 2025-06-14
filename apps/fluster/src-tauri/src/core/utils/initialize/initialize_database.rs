use std::sync::Arc;

use crate::{
    core::{
        database::{db::get_database_path, tables::table_paths::DatabaseTables},
        models::taggable::{
            subject_entity::SubjectEntity, tag_entity::TagEntity,
            tag_snippet_join_entity::SnippetTagEntity, topic_entity::TopicEntity,
        },
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::db_entity::DbEntity,
        },
    },
    features::{
        bibliography::data::bib_entry_entity::BibEntryEntity,
        dictionary::dictionary_entry_entity::DictionaryEntryEntity,
        math::data::{
            equation_entity::EquationEntity, equation_snippet_entity::EquationSnippetEntity,
            equation_tag_entity::EquationTagEntity,
        },
        mdx::data::{
            front_matter_entity::FrontMatterEntity, mdx_note_entity::MdxNoteEntity,
            mdx_note_equation_entity::MdxNoteEquationEntity,
            mdx_note_snippet_entity::MdxNoteSnippetEntity, mdx_note_tag_entity::MdxNoteTagEntity,
        },
        settings::settings_entity::SettingsEntity,
        snippets::snippet_entity::SnippetEntity,
    },
};
use arrow_schema::Schema;
use lancedb::{connect, Table};
use log::warn;

async fn create_table(
    db: &lancedb::Connection,
    schema: &Arc<Schema>,
    table: &DatabaseTables,
) -> FlusterResult<Table> {
    db.create_empty_table(table.to_string(), schema.clone())
        .mode(lancedb::database::CreateTableMode::Create)
        .execute()
        .await
        .map_err(|_| FlusterError::FailToCreateTable)
}

struct TableInitData {
    pub table: DatabaseTables,
    pub entity: Arc<Schema>,
}

#[tauri::command]
#[specta::specta]
pub async fn initialize_database() -> FlusterResult<()> {
    let table_data: Vec<TableInitData> = vec![
        TableInitData {
            table: DatabaseTables::Settings,
            entity: SettingsEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::Tags,
            entity: TagEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::Subjects,
            entity: SubjectEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::Topics,
            entity: TopicEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::Snippets,
            entity: SnippetEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::SnippetTags,
            entity: SnippetTagEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::Equations,
            entity: EquationEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::EquationSnippets,
            entity: EquationSnippetEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::MdxNote,
            entity: MdxNoteEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::FrontMatter,
            entity: FrontMatterEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::MdxNoteTag,
            entity: MdxNoteTagEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::EquationTag,
            entity: EquationTagEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::BibEntry,
            entity: BibEntryEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::DictionaryEntry,
            entity: DictionaryEntryEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::MdxNoteEquation,
            entity: MdxNoteEquationEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::MdxNoteSnippet,
            entity: MdxNoteSnippetEntity::arrow_schema(),
        },
    ];
    if let Ok(db_path) = get_database_path() {
        let db = connect(db_path.to_str().unwrap())
            .execute()
            .await
            .map_err(|_| FlusterError::FailToConnect)?;
        for td in table_data.iter() {
            // Don't return errors on failure to create the table because it likely just means
            // that the table already exists. Add some more robust error handling here once
            // the rest of the functionality is in working order. This additional functionality
            // is likely a necessity to allow for migrations in future versions.
            let res = create_table(&db, &td.entity, &td.table).await;
            if res.is_ok() {
                let s = td.table.to_string();
                warn!("Fluster failed while attempting to generate a database table for {s}",);
            }
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn initializes_database() {
        let app = tauri::test::mock_app();
        let handle = app.handle();
        initialize_database()
            .await
            .expect("Database initializes without throwing an error.");
    }
}
