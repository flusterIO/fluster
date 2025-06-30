use std::ops::Index;

use crate::core::types::{
    common_structs::parsed_content_result::ParsedContentResult, traits::mdx_parser::MdxParser,
};

use super::bib_entry_model::BibEntryModel;

pub struct BibEntryMdxParser {}

impl MdxParser<String> for BibEntryMdxParser {
    fn parse_mdx(&self, content: &str) -> ParsedContentResult<String> {
        let regex = BibEntryModel::get_regex();
        let mut new_content = content.to_string();
        let mut unique_ordered_bib_entries: Vec<String> = Vec::new();
        for regex_match in regex.captures_iter(content) {
            let (match_content, groups): (&str, [&str; 1]) = regex_match.extract();
            let id = *groups.index(0);
            if !unique_ordered_bib_entries.contains(&id.to_string()) {
                unique_ordered_bib_entries.push(id.to_string());
            }
            new_content = new_content.replace(
                match_content,
                &format!(
                    r#"<InlineCitation idx={{{}}} id='{}' />"#,
                    unique_ordered_bib_entries.len() - 1,
                    id
                ),
            );
        }
        ParsedContentResult {
            new_content,
            results: unique_ordered_bib_entries,
        }
    }
}
