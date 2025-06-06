use std::ops::Index;

use chrono::Utc;
use regex::Regex;

use crate::core::types::common_structs::parsed_content_result::ParsedContentResult;

pub struct BibEntryModel {
    pub id: String,
    pub user_provided_id: Option<String>,
    /// The json string representing this item's data.
    pub data: String,
    pub ctime: chrono::DateTime<Utc>,
}

impl BibEntryModel {
    fn get_regex() -> Regex {
        Regex::new(r#"\[\[cite:(?<citation_id>[^\]]+)\]\]"#)
            .expect("Creates regex without throwing an error.")
    }
    /// Make sure to add the returned ordered bib entries to the MdxNoteModel struct so a
    /// bibliography can be generated for each note with a reliable order.
    pub fn parse_content(content: &str) -> ParsedContentResult<String> {
        let regex = BibEntryModel::get_regex();
        let mut new_content = content.to_string();
        let mut unique_ordered_bib_entries: Vec<String> = Vec::new();
        for regex_match in regex.captures_iter(content) {
            let (match_content, groups): (&str, [&str; 1]) = regex_match.extract();
            let id = *groups.index(0);
            new_content =
                new_content.replace(match_content, &format!("<InlineCitation id=\"{}\" />", id));
            if !unique_ordered_bib_entries.contains(&id.to_string()) {
                unique_ordered_bib_entries.push(id.to_string());
            }
        }
        ParsedContentResult {
            new_content,
            results: unique_ordered_bib_entries,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_content_properly() {
        let test_content = r#"
# My test content

Here is a [[cite:my_citation_id]] here.
            "#;
        let parsed_content = BibEntryModel::parse_content(test_content);
    }
}
