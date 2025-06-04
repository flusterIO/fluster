use chrono::Utc;
use regex::Regex;
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Type, Serialize, Deserialize)]
pub struct DictionaryEntryModel {
    pub label: String,
    pub body: String,
    pub ctime: i64,
}

impl DictionaryEntryModel {
    pub fn get_regex() -> Regex {
        Regex::new(r#"```dictionary\s+-\s?(?P<title>[^\n]+)\n(?P<body>[^`]+)\n```"#)
            .expect("Creates regular expression without throwing an error.")
    }
}
