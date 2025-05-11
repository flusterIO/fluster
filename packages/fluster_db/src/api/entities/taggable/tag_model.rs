use crate::api::schema::generated::main_schema::mdx_note;
use diesel::prelude::*;
use rayon::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};

#[flutter_rust_bridge::frb(ignore)]
pub fn get_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[#(?<body>[^#]+)\]\]").unwrap()
}

pub enum TaggableType {
    Tag,
    Subject,
    Topic,
}

#[derive(
    Debug,
    Deserialize,
    Serialize,
    Clone,
    PartialEq,
    Eq,
    Queryable,
    Selectable,
    Insertable,
    Identifiable,
    QueryableByName,
)]
#[diesel(table_name = mdx_note, check_for_backend(diesel::pg::Pg))]
pub struct TaggableEntity {
    pub value: String,
}

pub struct TagFromContentResult {
    pub tags: Vec<Tag>,
    pub parsed_content: String,
}

impl TaggableEntity {
    pub fn from_string(val: String) -> Tag {
        Tag { value: val }
    }
    pub fn from_mdx_content(raw_content: &str) -> TagFromContentResult {
        let mut items: Vec<Tag> = Vec::new();
        let r = get_tag_regular_expression();
        let mut new_content = String::from(raw_content);
        for result in r.captures_iter(raw_content) {
            if let Some(body) = result.get(1) {
                let body_as_string = body.as_str();
                if !items
                    .par_iter()
                    .any(|tag_item| tag_item.value == body_as_string)
                {
                    items.push(Tag {
                        value: body_as_string.to_owned(),
                    });
                    new_content = new_content.replace(
                        &format!("[[#{}]]", body_as_string),
                        &format!("<Tag value={{\"{}\"}} />", body_as_string),
                    );
                }
            }
        }

        TagFromContentResult {
            tags: items,
            parsed_content: new_content.to_owned(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tag_regex_parses_properly() {
        let string = "My tag is [[#hereIsMyTag]]";
        let fail_string = "My tag is [#hereIsMyTag]";
        let r = get_tag_regular_expression();
        assert!(r.is_match(string), "Matches string properly.");
        assert!(!r.is_match(fail_string), "Doesn't match string properly.");
        let m = r.captures(string).expect("Parses string without error.");
        assert!(&m["body"] == "hereIsMyTag", "Finds id successfully.");
    }

    #[test]
    fn parses_tag_properly() {
        let string = "My tag is [[#hereIsMyTag]].";
        let t = Tag::from_mdx_content(string);
        dbg!(&t.parsed_content);
        assert_eq!(&t.tags[0].value, "hereIsMyTag", "Parses tag value properly");
        assert_eq!(
            &t.parsed_content, "My tag is <Tag value={\"hereIsMyTag\"} />.",
            "Parses tag value properly"
        );
    }
}
