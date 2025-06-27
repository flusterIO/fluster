use chrono::Utc;

use crate::core::types::{
    common_structs::parsed_content_result::ParsedContentResult, traits::mdx_parser::MdxParser,
};

use super::dictionary_entry_model::DictionaryEntryModel;

pub struct DictionaryEntryMdxParser {}

impl MdxParser<DictionaryEntryModel> for DictionaryEntryMdxParser {
    fn parse_mdx(&self, content: &str) -> ParsedContentResult<DictionaryEntryModel> {
        let mut results: Vec<DictionaryEntryModel> = Vec::new();
        let r = DictionaryEntryModel::get_regex();
        let mut new_content = String::from(content);
        let now = Utc::now().timestamp_millis().to_string();
        for result in r.captures_iter(content) {
            let complete_match = result.get(0);
            let body_match = result.get(2);
            let title_match = result.get(1);
            if body_match.is_some() && title_match.is_some() {
                results.push(DictionaryEntryModel {
                    label: title_match.unwrap().as_str().to_string(),
                    body: body_match.unwrap().as_str().to_string(),
                    ctime: now.clone(),
                });
                new_content = new_content.replace(
                    complete_match.unwrap().as_str(),
                    &format!(
                        r#"<DictionaryEntry label='{}'>
{}
</DictionaryEntry>"#,
                        title_match.unwrap().as_str(),
                        body_match.unwrap().as_str()
                    ),
                );
            }
        }
        ParsedContentResult {
            results,
            new_content,
        }
    }
}
