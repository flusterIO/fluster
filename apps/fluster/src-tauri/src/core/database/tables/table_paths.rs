use serde::{Deserialize, Serialize};
use strum_macros::{Display, EnumIter};

#[derive(Serialize, Deserialize, Display, EnumIter, PartialEq, Clone)]
pub enum DatabaseTables {
    // -- Taggables --
    #[strum(to_string = "tag")]
    Tag,
    #[strum(to_string = "topic")]
    Topic,
    #[strum(to_string = "subject")]
    Subject,
    #[strum(to_string = "setting")]
    Settings,
    #[strum(to_string = "auto_setting")]
    AutoSetting,
    // -- Mdx Note --
    #[strum(to_string = "bookmark")]
    Bookmark,
    #[strum(to_string = "mdx_note")]
    MdxNote,
    #[strum(to_string = "front_matter")]
    FrontMatter,
    #[strum(to_string = "front_matter_tag")]
    FrontMatterTag,
    #[strum(to_string = "mdx_note_tag")]
    MdxNoteTag,
    #[strum(to_string = "mdx_note_equation")]
    MdxNoteEquation,
    #[strum(to_string = "mdx_note_snippet")]
    MdxNoteSnippet,
    #[strum(to_string = "mdx_note_topic")]
    MdxNoteTopic,
    #[strum(to_string = "mdx_note_subject")]
    MdxNoteSubject,
    #[strum(to_string = "mdx_note_dictionary_entry")]
    MdxNoteDictionaryEntry,
    #[strum(to_string = "mdx_note_link")]
    MdxNoteLink,
    // -- Dictionary --
    #[strum(to_string = "dictionary_entry")]
    DictionaryEntry,
    // -- Bib --
    #[strum(to_string = "bib_entry")]
    BibEntry,
    #[strum(to_string = "mdx_note_bib_entry")]
    MdxNoteBibEntry,
    // -- Snippets --
    #[strum(to_string = "snippet")]
    Snippet,
    #[strum(to_string = "snippet_tag")]
    SnippetTag,
    // -- Math --
    #[strum(to_string = "equation")]
    Equation,
    #[strum(to_string = "equation_snippet")]
    EquationSnippets,
    #[strum(to_string = "equation_tag")]
    EquationTag,
    // -- Task manager --
    #[strum(to_string = "task_list")]
    TaskList,
    #[strum(to_string = "task")]
    Task,
    #[strum(to_string = "task_tag")]
    TaskTag,
    // -- AI Chat --
    #[strum(to_string = "ai_chat")]
    AiChat,
    #[strum(to_string = "ai_chat_message")]
    AiChatMessage,
    // -- Kanban Boards --
    #[strum(to_string = "kanban_board")]
    KanbanBoard,
    #[strum(to_string = "kanban_board_task_list")]
    KanbanBoardTaskList,
    #[strum(to_string = "kanban_board_entry")]
    KanbanCard,
    #[strum(to_string = "kanban_board_list")]
    KanbanBoardList,
    // -- Flashcard --
    #[strum(to_string = "flashcard")]
    Flashcard,
    #[strum(to_string = "flashcard_subject")]
    FlashcardSubject,
    #[strum(to_string = "flashcard_topic")]
    FlashcardTopic,
    #[strum(to_string = "flashcard_tag")]
    FlashcardTag,
    // -- Whiteboard --
    #[strum(to_string = "whiteboard")]
    Whiteboard,
    #[strum(to_string = "vector")]
    Vector,
}
