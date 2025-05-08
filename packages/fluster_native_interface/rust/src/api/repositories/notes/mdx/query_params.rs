use serde::{Deserialize, Serialize};

#[derive(Default, Serialize, Deserialize, Clone, Debug)]
pub enum DbTokenizerLanguage {
    Arabic,
    Danish,
    Dutch,
    #[default]
    English,
    French,
    German,
    Greek,
    Hungarian,
    Italian,
    Norwegian,
    Portuguese,
    Romanian,
    Russian,
    Spanish,
    Swedish,
    Tamil,
    Turkish,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct MdxNoteQueryParams {
    pub query: String,
    pub language: DbTokenizerLanguage,
}
