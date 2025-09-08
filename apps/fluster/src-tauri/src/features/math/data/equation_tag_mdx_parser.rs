use std::ops::Index;

use regex::Regex;

use crate::core::types::{
    common_structs::parsed_content_result::ParsedContentResult, traits::mdx_parser::MdxParser,
};

pub struct EquationEmbeddedTagMdxParser {}

impl EquationEmbeddedTagMdxParser {
    pub fn get_regex(&self) -> Regex {
        Regex::new(r#"\[\[eq:(?<equation_id>[^\]]+)\]\]"#)
            .expect("Creates regex without throwing an error.")
    }
}

impl MdxParser<String> for EquationEmbeddedTagMdxParser {
    fn parse_mdx(
        &self,
        content: &str,
    ) -> crate::core::types::common_structs::parsed_content_result::ParsedContentResult<String>
    {
        let regex = self.get_regex();
        let mut new_content = content.to_string();
        let mut embedded_equation_ids: Vec<String> = Vec::new();
        for regex_match in regex.captures_iter(content) {
            let (match_content, groups): (&str, [&str; 1]) = regex_match.extract();
            let id = *groups.index(0);
            if !embedded_equation_ids.contains(&id.to_string()) {
                embedded_equation_ids.push(id.to_string());
            }
            new_content =
                new_content.replace(match_content, &format!(r#"<EquationTag id='{}' />"#, id));
        }
        ParsedContentResult {
            new_content,
            results: embedded_equation_ids,
        }
    }
}
