use diesel::{
    prelude::{Associations, Identifiable, Queryable},
    Selectable,
};

use super::tag_model::TagEntity;

use crate::api::{
    data_interface::database::schema::generated::main_schema::mdx_note_taggable_join,
    models::mdx_note::mdx_note_entity::MdxNoteEntity,
};

#[derive(Identifiable, Selectable, Queryable, Associations, Debug)]
#[diesel(belongs_to(TagEntity, foreign_key = tag_id))]
#[diesel(belongs_to(MdxNoteEntity, foreign_key = mdx_note_id))]
#[diesel(table_name = mdx_note_taggable_join)]
#[diesel(primary_key(tag_id, mdx_note_id))]
pub struct TaggableWithMdxNoteJoin {
    pub tag_id: i32,
    pub mdx_note_id: i32,
}
