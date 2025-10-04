use regex::Regex;
use std::ops::Index;

use crate::core::types::{
    common_structs::parsed_content_result::ParsedContentResult, traits::mdx_parser::MdxParser,
};

pub struct VideoTimestampLinkParser {}

impl VideoTimestampLinkParser {
    pub fn get_regex(&self) -> Regex {
        Regex::new(r#"\[(?<body>[^\]]*)\]\(video:(?<video_id>[^@]*)@(?<timesamp>[^\)]*)\)"#)
            .expect("Creates video timestamp link without error.")
    }
}

#[allow(for_loops_over_fallibles)]
impl MdxParser<String> for VideoTimestampLinkParser {
    fn parse_mdx(&self, content: &str) -> ParsedContentResult<String> {
        let regex = self.get_regex();
        let mut new_content = content.to_string();
        for regex_match in regex.captures_iter(content) {
            let (match_content, groups): (&str, [&str; 3]) = regex_match.extract();
            let body = *groups.index(0);
            let video_id = *groups.index(1);
            let timestamp = *groups.index(2);
            new_content = new_content.replace(
                match_content,
                &format!(
                    r#"<VideoTimestampLink id='{}' timestamp="{}">{}</VideoTimestampLink>"#,
                    video_id, timestamp, body
                ),
            );
        }
        ParsedContentResult {
            new_content,
            results: Vec::new(),
        }
    }
}
