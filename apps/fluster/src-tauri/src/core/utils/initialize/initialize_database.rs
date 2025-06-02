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
        math::data::equation_entity::EquationEntity,
        mdx::data::{front_matter_entity::FrontMatterEntity, mdx_note_entity::MdxNoteEntity},
        settings::settings_entity::SettingsEntity,
        snippets::snippet_entity::SnippetEntity,
    },
};
use arrow_schema::Schema;
use lancedb::{connect, Table};

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
            entity: EquationEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::MdxNotes,
            entity: MdxNoteEntity::arrow_schema(),
        },
        TableInitData {
            table: DatabaseTables::FrontMatter,
            entity: FrontMatterEntity::arrow_schema(),
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
            // the rest of the functionality is in working order.
            create_table(&db, &td.entity, &td.table).await;
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
