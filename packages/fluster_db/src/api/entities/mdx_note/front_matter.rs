use crate::api::entities::mdx_note::mdx_note_entity::MdxNoteEntity;
use crate::api::schema::generated::main_schema::front_matter;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Serialize, Debug, Deserialize, Clone, Queryable, Identifiable, Selectable, Associations, Default,
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
