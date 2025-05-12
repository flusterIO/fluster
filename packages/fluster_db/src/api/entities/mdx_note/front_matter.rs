use crate::api::schema::generated::main_schema::front_matter;
use crate::entities::taggable::tag_model::TagCreatable;
use crate::{
    api::entities::mdx_note::mdx_note_entity::MdxNoteEntity,
    entities::taggable::tag_model::TagEntity,
};
use diesel::prelude::*;
use gray_matter::Pod;
use serde::{Deserialize, Serialize};

#[derive(
    Serialize, Deserialize, Clone, Queryable, Identifiable, Selectable, Associations, Default,
)]
#[diesel(table_name = front_matter, check_for_backend(diesel::pg::Pg))]
#[diesel(belongs_to(MdxNoteEntity, foreign_key = mdx_note_id))]
pub struct FrontMatterEntity {
    pub id: i32,
    pub title: String,
    pub summary: Option<String>,
    pub mdx_note_id: i32,
    /// This is the `id` field in the user's front matter.
    pub user_provided_id: Option<String>,
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
                    let mut tags = d["tags"].clone();
                    let mut tag_items: Vec<TagCreatable> = Vec::new();
                    for _ in 0..tags.len() {
                        let tag_item = tags.pop().as_string();
                        if let Ok(item) = tag_item {
                            tag_items.push(TagCreatable {
                                value: item,
                                id: None,
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
    }
}
