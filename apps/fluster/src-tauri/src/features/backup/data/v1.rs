use serde::{Deserialize, Serialize};

use crate::core::types::errors::errors::FlusterResult;
use crate::core::types::FlusterDb;
use crate::features::ai::data::db::ai_chat_entity::AiChatEntity;
use crate::features::ai::data::db::ai_chat_message_entity::AiChatMessageEntity;
use crate::features::ai::data::db::ai_chat_message_model::AiChatMessageModel;
use crate::features::ai::data::db::ai_chat_model::AiChatModel;
use crate::features::backup::data::backup_data::BackupData;
use crate::features::flashcard::data::models::flashcard_entity::FlashcardEntity;
use crate::features::flashcard::data::models::flashcard_model::FlashcardModel;
use crate::features::flashcard::data::models::flashcard_subject_entity::FlashcardSubjectEntity;
use crate::features::flashcard::data::models::flashcard_subject_model::FlashcardSubjectModel;
use crate::features::flashcard::data::models::flashcard_tag_entity::FlashcardTagEntity;
use crate::features::flashcard::data::models::flashcard_tag_model::FlashcardTagModel;
use crate::features::flashcard::data::models::flashcard_topic_entity::FlashcardTopicEntity;
use crate::features::flashcard::data::models::flashcard_topic_model::FlashcardTopicModel;
use crate::features::kanban::data::kanban_board_entity::KanbanBoardEntity;
use crate::features::kanban::data::kanban_board_list_entity::KanbanBoardListEntity;
use crate::features::kanban::data::kanban_board_list_model::KanbanBoardListModel;
use crate::features::kanban::data::kanban_board_model::KanbanBoardModel;
use crate::features::kanban::data::kanban_board_task_list_entity::KanbanBoardTaskListEntity;
use crate::features::kanban::data::kanban_board_task_list_model::KanbanBoardTaskListModel;
use crate::features::math::data::equation_entity::EquationEntity;
use crate::features::math::data::equation_model::EquationModel;
use crate::features::math::data::equation_snippet_entity::EquationSnippetEntity;
use crate::features::math::data::equation_snippet_model::EquationSnippetModel;
use crate::features::math::data::equation_tag_entity::EquationTagEntity;
use crate::features::math::data::equation_tag_model::EquationTagModel;
use crate::features::mdx::data::bookmark_entity::BookmarkEntity;
use crate::features::mdx::data::bookmark_model::BookmarkModel;
use crate::features::search::types::PaginationProps;
use crate::features::settings::data::auto_setting_entity::AutoSettingEntity;
use crate::features::settings::data::auto_setting_model::AutoSettingModel;
use crate::features::settings::settings_entity::SettingsEntity;
use crate::features::settings::settings_model::SettingsModel;
use crate::features::snippets::data::snippet_entity::SnippetEntity;
use crate::features::snippets::data::snippet_model::SnippetModel;
use crate::features::snippets::data::snippet_tag_entity::SnippetTagEntity;
use crate::features::snippets::data::snippet_tag_model::SnippetTagModel;
use crate::features::snippets::get_snippet_params::GetSnippetsParams;
use crate::features::task_manager::task_entity::TaskEntity;
use crate::features::task_manager::task_list_entity::TaskListEntity;
use crate::features::task_manager::task_list_model::TaskListModel;
use crate::features::task_manager::task_model::TaskModel;
use crate::features::task_manager::task_tag_entity::TaskTagEntity;
use crate::features::task_manager::task_tag_model::TaskTagModel;
use crate::features::whiteboard::data::whiteboard_entity::WhiteboardEntity;
use crate::features::whiteboard::data::whiteboard_model::WhiteboardModel;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct BackupDataV1 {
    pub version: i16,
    pub ai_chat: Vec<AiChatModel>,
    pub ai_chat_message: Vec<AiChatMessageModel>,
    pub flashcards: Vec<FlashcardModel>,
    pub flashcard_subjects: Vec<FlashcardSubjectModel>,
    pub flashcard_tags: Vec<FlashcardTagModel>,
    pub flashcard_topics: Vec<FlashcardTopicModel>,
    pub kanban_board_lists: Vec<KanbanBoardListModel>,
    pub kanban_boards: Vec<KanbanBoardModel>,
    pub kanban_board_task_lists: Vec<KanbanBoardTaskListModel>,
    pub equations: Vec<EquationModel>,
    pub equation_snippets: Vec<EquationSnippetModel>,
    pub equation_tags: Vec<EquationTagModel>,
    pub bookmarks: Vec<BookmarkModel>,
    pub auto_settings: Vec<AutoSettingModel>,
    pub settings: SettingsModel,
    pub snippets: Vec<SnippetModel>,
    pub snippet_tags: Vec<SnippetTagModel>,
    pub task_lists: Vec<TaskListModel>,
    pub tasks: Vec<TaskModel>,
    pub task_tags: Vec<TaskTagModel>,
    pub whiteboards: Vec<WhiteboardModel>,
}

impl Default for BackupDataV1 {
    fn default() -> Self {
        Self {
            version: 1,
            ai_chat: Default::default(),
            ai_chat_message: Default::default(),
            flashcards: Default::default(),
            flashcard_subjects: Default::default(),
            flashcard_tags: Default::default(),
            flashcard_topics: Default::default(),
            kanban_board_lists: Default::default(),
            kanban_boards: Default::default(),
            kanban_board_task_lists: Default::default(),
            equations: Default::default(),
            equation_snippets: Default::default(),
            equation_tags: Default::default(),
            bookmarks: Default::default(),
            auto_settings: Default::default(),
            settings: SettingsModel::default(),
            snippets: Default::default(),
            snippet_tags: Default::default(),
            task_lists: Default::default(),
            tasks: Default::default(),
            task_tags: Default::default(),
            whiteboards: Default::default(),
        }
    }
}

impl BackupData for BackupDataV1 {
    fn version(&self) -> i16 {
        return 1;
    }

    async fn generate(&mut self, db: &FlusterDb<'_>) -> FlusterResult<()> {
        self.ai_chat = AiChatEntity::get_all(db).await?;
        self.ai_chat_message = AiChatMessageEntity::get_all(db).await?;
        self.flashcards =
            FlashcardEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.flashcard_subjects =
            FlashcardSubjectEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.flashcard_tags =
            FlashcardTagEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.flashcard_topics =
            FlashcardTopicEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.kanban_board_lists =
            KanbanBoardListEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.kanban_boards =
            KanbanBoardEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.kanban_board_task_lists =
            KanbanBoardTaskListEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.equations = EquationEntity::get_many(db).await?;
        self.equation_snippets =
            EquationSnippetEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.equation_tags =
            EquationTagEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.bookmarks = BookmarkEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.auto_settings =
            AutoSettingEntity::get_many(db, &None, &PaginationProps::take_all()).await?;
        self.settings = SettingsEntity::get_setting_model(db).await?;
        self.snippets = SnippetEntity::get_many(db, GetSnippetsParams { langs: None }).await?;
        self.snippet_tags =
            SnippetTagEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.task_lists = TaskListEntity::get_all(db).await?;
        self.tasks = TaskEntity::get_all(db).await?;
        self.task_tags = TaskTagEntity::get_all(db, PaginationProps::take_all(), None).await?;
        self.whiteboards = WhiteboardEntity::get_all(db, PaginationProps::take_all(), None).await?;
        Ok(())
    }
}
