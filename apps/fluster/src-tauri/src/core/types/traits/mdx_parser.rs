use crate::core::types::common_structs::parsed_content_result::ParsedContentResult;

pub trait MdxParser<T> {
    fn parse_mdx(&self, content: &str) -> ParsedContentResult<T>;
}
