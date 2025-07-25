use regex::Regex;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct DictionaryEntryModelWithoutSource {
    /// Primary Key
    pub label: String,
    pub body: String,
    pub ctime: String,
}

#[derive(Type, Serialize, Deserialize, Debug, Clone)]
pub struct DictionaryEntryModel {
    /// Primary Key
    pub label: String,
    pub body: String,
    /// The source string for the mdx source that produces this dictionary entry. This is just
    /// a file path for local notes.
    pub mdx_source: String,
    pub ctime: String,
}

impl DictionaryEntryModel {
    pub fn get_regex() -> Regex {
        Regex::new(r#"```dictionary\s+--\s?(?P<title>[^\n]+)\n(?P<body>[^`]+)\n```"#)
            .expect("Creates regular expression without throwing an error.")
    }
}
