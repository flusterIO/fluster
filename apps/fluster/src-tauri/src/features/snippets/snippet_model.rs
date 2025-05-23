use serde::{Deserialize, Serialize};
use specta::Type;

use super::syntax_supported_language::SyntaxSupportedLanguage;

#[derive(Type, Serialize, Deserialize)]
pub struct SnippetItem {
    body: String,
    desc: String,
    lang: SyntaxSupportedLanguage,
}
