use serde::{Deserialize, Serialize};
use specta::Type;

use super::syntax_supported_language::SyntaxSupportedLanguage;

#[derive(Type, Serialize, Deserialize)]
pub struct SnippetItem {
    id: Option<i32>,
    label: String,
    body: String,
    desc: String,
    lang: SyntaxSupportedLanguage,
}
