use fluster_db::entities::{
    front_matter::front_matter_entity::FrontMatterEntity, taggable::tag_model::TagCreatable,
};
use fluster_types::enums::taggable_type::TaggableTypeEnum;
use gray_matter::Pod;
use serde::{Deserialize, Serialize};

/// This model mirrors the structure of the front matter as it appears in a user's note, where the
/// nested entities represent the data as it is stored in the database. This model should handle
/// all parsing and saving of all nested models.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FrontMatter {
    pub data: FrontMatterEntity,
    pub tags: Vec<TagCreatable>,
    pub subjects: Vec<TagCreatable>,
    pub topics: Vec<TagCreatable>,
}

impl FrontMatter {
    pub fn from_gray_matter(pod: Option<Pod>) -> FrontMatter {
        let mut tags: Vec<TagCreatable> = Vec::new();
        let mut subjects: Vec<TagCreatable> = Vec::new();
        let mut topics: Vec<TagCreatable> = Vec::new();
        let front_matter: FrontMatterEntity = match pod {
            None => FrontMatterEntity::default(),
            Some(p) => {
                let mut x = FrontMatterEntity::default();
                // Set title
                let data = p.as_hashmap();
                if let Err(_) = p.as_hashmap() {
                    FrontMatterEntity::default()
                } else {
                    let d = data.unwrap();
                    if d.contains_key("title") {
                        let title = d["title"].as_string();
                        if title.is_ok() {
                            x.title = title.unwrap();
                        }
                    }
                    // Set summary
                    if d.contains_key("summary") {
                        let summary = d["summary"].as_string();
                        if summary.is_ok() {
                            x.summary = Some(summary.unwrap());
                        }
                    }
                    // Set tags
                    if d.contains_key("tags") {
                        let mut item_tags = d["tags"].clone();
                        for _ in 0..item_tags.len() {
                            let tag_item = item_tags.pop().as_string();
                            if let Ok(item) = tag_item {
                                tags.push(TagCreatable {
                                    value: item,
                                    id: None,
                                    tag_type: TaggableTypeEnum::Tag.to_string(),
                                });
                            }
                        }
                    }

                    if d.contains_key("subjects") {
                        let mut item_tags = d["subjects"].clone();
                        for _ in 0..item_tags.len() {
                            let tag_item = item_tags.pop().as_string();
                            if let Ok(item) = tag_item {
                                subjects.push(TagCreatable {
                                    value: item,
                                    id: None,
                                    tag_type: TaggableTypeEnum::Subject.to_string(),
                                });
                            }
                        }
                    }
                    if d.contains_key("topics") {
                        let mut item_tags = d["topics"].clone();
                        for _ in 0..item_tags.len() {
                            let tag_item = item_tags.pop().as_string();
                            if let Ok(item) = tag_item {
                                topics.push(TagCreatable {
                                    value: item,
                                    id: None,
                                    tag_type: TaggableTypeEnum::Topic.to_string(),
                                });
                            }
                        }
                    }
                    // Set note_id
                    if d.contains_key("id") {
                        let note_id = d["id"].as_string();
                        if note_id.is_ok() {
                            x.user_provided_id = Some(note_id.unwrap());
                        }
                    }
                    // x.tags = tags.unwrap().;
                    x
                }
            }
        };
        FrontMatter {
            data: front_matter,
            tags,
            topics,
            subjects,
        }
    }
}
