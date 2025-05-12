use diesel::{
    prelude::{Associations, Identifiable, Queryable},
    Selectable,
};

use super::tag_model::TagEntity;
use crate::api::schema::generated::main_schema::front_matter_taggable_join;

use crate::api::entities::mdx_note::front_matter::FrontMatterEntity;

#[derive(Identifiable, Selectable, Queryable, Associations, Debug)]
#[diesel(belongs_to(TagEntity, foreign_key = tag_id))]
#[diesel(belongs_to(FrontMatterEntity, foreign_key = front_matter_id))]
#[diesel(table_name = front_matter_taggable_join)]
#[diesel(primary_key(tag_id, front_matter_id))]
pub struct TaggableWithFrontMatterJoin {
    pub id: Option<i32>,
    pub tag_id: i32,
    pub front_matter_id: i32,
}
