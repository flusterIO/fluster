use fluster_db::entities::taggable::tag_model::TaggableType;
use gray_matter::{ParsedEntity, Pod};
use rayon::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize, Debug)]
pub struct Taggable {
    pub value: String,
    pub tag_type: TaggableType,
}

pub struct TagFromContentResult {
    pub tags: Vec<Taggable>,
    pub parsed_content: String,
}

pub struct TagFromPodResult {
    pub tags: Vec<Taggable>,
}

pub fn get_tag_regular_expression() -> Regex {
    Regex::new(r"\[\[#(?<body>[^#]+)\]\]").unwrap()
}

impl Taggable {
    fn handle_arr_data<'a>(
        d: &Pod,
        taggables: &Vec<Taggable>,
        tag_type: &TaggableType,
    ) -> Vec<Taggable> {
        let mut tags = taggables.clone();
        if !d.is_empty() {
            let res = d.as_vec();
            if res.is_ok() {
                res.unwrap()
                    .iter()
                    .map(|x| {
                        let s = x.as_string();
                        if s.is_ok() {
                            tags.push(Taggable {
                                value: s.unwrap(),
                                tag_type: tag_type.clone(),
                            })
                        }
                    })
                    .collect()
            }
        }
        tags
    }
    pub fn from_pod_data(data: &ParsedEntity) -> Vec<Taggable> {
        let mut tags: Vec<Taggable> = Vec::new();
        if let Some(parsed_data) = &data.data {
            if let Ok(h) = parsed_data.as_hashmap() {
                tags = Taggable::handle_arr_data(&h["tags"], &tags, &TaggableType::Tag);
                tags = Taggable::handle_arr_data(&h["topics"], &tags, &TaggableType::Topic);
                tags = Taggable::handle_arr_data(&h["subjects"], &tags, &TaggableType::Subject);
            }
        }
        tags
    }
    pub fn from_mdx_content(data: &ParsedEntity) -> TagFromContentResult {
        let mut tags: Vec<Taggable> = Taggable::from_pod_data(&data);
        let r = get_tag_regular_expression();
        let mut new_content = String::from(&data.content);
        for result in r.captures_iter(&data.content) {
            if let Some(body) = result.get(1) {
                let body_as_string = body.as_str();
                if !tags
                    .par_iter()
                    .any(|tag_item| tag_item.value == body_as_string)
                {
                    tags.push(Taggable {
                        value: body_as_string.to_owned(),
                        tag_type: TaggableType::Tag,
                    });
                    new_content = new_content.replace(
                        &format!("[[#{}]]", body_as_string),
                        &format!("<Tag value={{\"{}\"}} />", body_as_string),
                    );
                }
            }
        }
        TagFromContentResult {
            tags,
            parsed_content: new_content,
        }
    }
}
