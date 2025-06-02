use serde::{Deserialize, Serialize};
use strum_macros::{Display, EnumIter};

#[derive(Serialize, Deserialize, Display, EnumIter, PartialEq)]
pub enum DatabaseTables {
    #[strum(to_string = "snippet")]
    Snippets,
    #[strum(to_string = "snippet_tags")]
    SnippetTags,
    #[strum(to_string = "equations")]
    Equations,
    #[strum(to_string = "equation_snippet")]
    EquationSnippets,
    #[strum(to_string = "equation_tag")]
    EquationTag,
    #[strum(to_string = "tag")]
    Tags,
    #[strum(to_string = "topic")]
    Topics,
    #[strum(to_string = "subject")]
    Subjects,
    #[strum(to_string = "settings")]
    Settings,
    #[strum(to_string = "mdx_notes")]
    MdxNotes,
    #[strum(to_string = "front_matter")]
    FrontMatter,
    #[strum(to_string = "mdx_note_tag")]
    MdxNoteTag,
    #[strum(to_string = "bib_entry")]
    BibEntry,
}
