use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub enum SyntaxSupportedLanguage {
    Ts,
    Typescript,
    Javascript,
    Go,
    Lua,
    Markdown,
    Mdx,
}
