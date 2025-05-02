use gray_matter::Pod;
use serde::{Deserialize, Serialize};

use crate::models::taggable::tag_model::Tag;

#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct FrontMatterEntity {
    pub title: Option<String>,
    pub summary: Option<String>,
    pub tags: Vec<Tag>,
    /// This is the `id` field in the user's frontmatter. This is called `note_id` to distinguish
    /// it from the `id` field produced by surrealdb.
    pub note_id: Option<String>,
}

impl FrontMatterEntity {
    pub fn from_gray_matter(pod: Option<Pod>) -> FrontMatterEntity {
        match pod {
            None => FrontMatterEntity::default(),
            Some(p) => {
                let mut x = FrontMatterEntity::default();
                // Set title
                let data = p.as_hashmap();
                if data.is_err() {
                    return FrontMatterEntity::default();
                }
                let d = data.unwrap();
                if d.contains_key("title") {
                    let title = d["title"].as_string();
                    if title.is_ok() {
                        x.title = Some(title.unwrap());
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
                    let mut tags = d["tags"].clone();
                    let mut tag_items: Vec<Tag> = Vec::new();
                    for _ in 0..tags.len() {
                        let tag_item = tags.pop().as_string();
                        if let Ok(item) = tag_item {
                            tag_items.push(Tag::from_string(item));
                        }
                    }
                }
                // Set note_id
                if d.contains_key("id") {
                    let note_id = d["id"].as_string();
                    if note_id.is_ok() {
                        x.note_id = Some(note_id.unwrap());
                    }
                }
                // x.tags = tags.unwrap().;
                x
            }
        }
    }
}
