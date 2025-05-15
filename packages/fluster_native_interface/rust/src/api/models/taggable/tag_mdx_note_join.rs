use diesel::{
    prelude::{Associations, Identifiable, Queryable},
    Selectable,
};
use fluster_db::generated::main_schema::mdx_note_taggable_join;
use flutter_rust_bridge::frb;

use crate::api::models::mdx_note::mdx_note_entity::MdxNoteEntity;

use super::tag_model::TagEntity;

#[derive(Identifiable, Selectable, Queryable, Associations, Debug)]
#[diesel(belongs_to(TagEntity, foreign_key = tag_id))]
#[diesel(belongs_to(MdxNoteEntity, foreign_key = mdx_note_id))]
#[diesel(table_name = mdx_note_taggable_join)]
#[diesel(primary_key(tag_id, mdx_note_id))]
#[frb(ignore)]
pub struct TaggableWithMdxNoteJoin {
    pub tag_id: i32,
    pub mdx_note_id: i32,
}
