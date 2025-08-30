use serde::{Deserialize, Serialize};
use specta::Type;

use crate::features::{
    math::data::equation_model::EquationData, mdx::data::mdx_note_group::MdxNoteGroup,
    snippets::data::snippet_model::SnippetData, task_manager::task_model::TaskModel,
};

/// The search results returned froma  taggable input or via a traditional text based query.
#[derive(Serialize, Deserialize, Type)]
pub struct TraditionalSearchResults {
    pub notes: Vec<MdxNoteGroup>,
    pub tasks: Vec<TaskModel>,
    pub equations: Vec<EquationData>,
    pub snippets: Vec<SnippetData>,
}
