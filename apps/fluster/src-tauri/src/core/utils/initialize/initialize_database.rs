use std::sync::Arc;

use crate::{
    core::{
        database::{db::get_database_path, tables::table_paths::DatabaseTables},
        models::taggable::{
            subject_entity::SubjectEntity, tag_entity::TagEntity, topic_entity::TopicEntity,
        },
        types::{
            errors::errors::{FlusterError, FlusterResult},
            traits::{db_entity::DbEntity, index_function::DatabaseIndexSetupFunction},
        },
    },
    features::{
        ai::data::{
            db::{ai_chat_entity::AiChatEntity, ai_chat_message_entity::AiChatMessageEntity},
            models::vector::vector_entity::VectorEntity,
        },
        bibliography::data::bib_entry_entity::BibEntryEntity,
        dictionary::dictionary_entry_entity::DictionaryEntryEntity,
        kanban::data::{
            kanban_board_entity::KanbanBoardEntity,
            kanban_board_entry_entity::KanbanBoardEntryEntity,
            kanban_board_list_entity::KanbanBoardListEntity,
            kanban_board_task_list_entity::KanbanBoardTaskListEntity,
        },
        math::data::{
            equation_entity::EquationEntity, equation_snippet_entity::EquationSnippetEntity,
            equation_tag_entity::EquationTagEntity,
        },
        mdx::data::{
            bookmark_entity::BookmarkEntity, front_matter_entity::FrontMatterEntity,
            front_matter_tag_entity::FrontMatterTagEntity,
            mdx_note_bib_entry_entity::MdxNoteBibEntryEntity,
            mdx_note_dictionary_entry_entity::MdxNoteDictionaryEntryEntity,
            mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
            mdx_note_link_entity::MdxNoteLinkEntity, mdx_note_snippet_entity::MdxNoteSnippetEntity,
            mdx_note_subject_entity::MdxNoteSubjectEntity, mdx_note_tag_entity::MdxNoteTagEntity,
            mdx_note_topic_entity::MdxNoteTopicEntity,
        },
        settings::{data::auto_setting_entity::AutoSettingEntity, settings_entity::SettingsEntity},
        snippets::data::{snippet_entity::SnippetEntity, snippet_tag_entity::SnippetTagEntity},
        task_manager::{
            task_entity::TaskEntity, task_list_entity::TaskListEntity,
            task_tag_entity::TaskTagEntity,
        },
        whiteboard::data::whiteboard_entity::WhiteboardEntity,
    },
};
use arrow_schema::Schema;
use lancedb::{connect, Table};
use log::warn;

use super::set_indices::set_bib_entry_index::set_bib_entry_index;

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
    /// An optional function called after the table is created so indices can be applied.
    pub set_indices: Option<DatabaseIndexSetupFunction>,
}

#[tauri::command]
#[specta::specta]
pub async fn initialize_database() -> FlusterResult<()> {
    let table_data: Vec<TableInitData> = vec![
        TableInitData {
            table: DatabaseTables::Settings,
            entity: SettingsEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::AutoSetting,
            entity: AutoSettingEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::Tag,
            entity: TagEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::Subject,
            entity: SubjectEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::Topic,
            entity: TopicEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Mdx Note --
        TableInitData {
            entity: MdxNoteEntity::arrow_schema(),
            table: DatabaseTables::MdxNote,
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::FrontMatter,
            entity: FrontMatterEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::FrontMatterTag,
            entity: FrontMatterTagEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::Bookmark,
            entity: BookmarkEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteTag,
            entity: MdxNoteTagEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteTopic,
            entity: MdxNoteTopicEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteSubject,
            entity: MdxNoteSubjectEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteDictionaryEntry,
            entity: MdxNoteDictionaryEntryEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteLink,
            entity: MdxNoteLinkEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Snippets --
        TableInitData {
            table: DatabaseTables::Snippet,
            entity: SnippetEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::SnippetTag,
            entity: SnippetTagEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::EquationSnippets,
            entity: EquationSnippetEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteSnippet,
            entity: MdxNoteSnippetEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Equations --
        TableInitData {
            table: DatabaseTables::Equation,
            entity: EquationEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::EquationTag,
            entity: EquationTagEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteEquation,
            entity: MdxNoteEquationEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Bib --
        TableInitData {
            table: DatabaseTables::BibEntry,
            entity: BibEntryEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::MdxNoteBibEntry,
            entity: MdxNoteBibEntryEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::BibEntry,
            entity: BibEntryEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Dictionary --
        TableInitData {
            table: DatabaseTables::DictionaryEntry,
            entity: DictionaryEntryEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Task Manager --
        TableInitData {
            table: DatabaseTables::TaskList,
            entity: TaskListEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::Task,
            entity: TaskEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::TaskTag,
            entity: TaskTagEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Ai --
        TableInitData {
            table: DatabaseTables::AiChat,
            entity: AiChatEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::AiChatMessage,
            entity: AiChatMessageEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Kanban Boards --
        TableInitData {
            table: DatabaseTables::KanbanBoard,
            entity: KanbanBoardEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::KanbanBoardTaskList,
            entity: KanbanBoardTaskListEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::KanbanBoardEntry,
            entity: KanbanBoardEntryEntity::arrow_schema(),
            set_indices: None,
        },
        TableInitData {
            table: DatabaseTables::KanbanBoardList,
            entity: KanbanBoardListEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Whiteboard --
        TableInitData {
            table: DatabaseTables::Whiteboard,
            entity: WhiteboardEntity::arrow_schema(),
            set_indices: None,
        },
        // -- Vector Store --
        TableInitData {
            table: DatabaseTables::Vector,
            // Use any schema here since it will just be overwritten.
            entity: VectorEntity::arrow_schema(0),
            set_indices: None,
        },
    ];
    if let Ok(db_path) = get_database_path() {
        let db = connect(db_path.to_str().unwrap())
            .execute()
            .await
            .map_err(|e| {
                println!("Error in initialize_database: {:?}", e);
                FlusterError::FailToConnect
            })?;
        for td in table_data.iter() {
            // Don't return errors on failure to create the table because it likely just means
            // that the table already exists. Add some more robust error handling here once
            // the rest of the functionality is in working order. This additional functionality
            // is likely a necessity to allow for migrations in future versions.
            if td.table != DatabaseTables::Vector {
                let res = create_table(&db, &td.entity, &td.table).await;
                if res.is_ok() {
                    if td.set_indices.is_some() {
                        // td.set_indices(&db).await
                    }
                } else {
                    let s = td.table.to_string();
                    warn!("Fluster failed while attempting to generate a database table for {s}",);
                }
            }
        }
        // TODO: Move these index functions to the loop when on WIFI and able to look at the docs for this fucking type issue.
        set_bib_entry_index(&db).await?;
        //TODO: Create the vector index. There's currently an error, and it's not worth the
        //time to mess with this before launching when we're so close.
        // set_mdx_note_body_index(&db).await?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn initializes_database() {
        initialize_database()
            .await
            .expect("Database initializes without throwing an error.");
    }
}
