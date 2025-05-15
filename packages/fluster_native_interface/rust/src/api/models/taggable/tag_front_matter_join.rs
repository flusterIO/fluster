use diesel::{
    prelude::{Associations, Identifiable, Queryable},
    Selectable,
};
use flutter_rust_bridge::frb;

use crate::api::models::front_matter::front_matter_entity::FrontMatterEntity;

use super::tag_model::TagEntity;
use fluster_db::generated::main_schema::front_matter_taggable_join;

#[derive(Identifiable, Selectable, Queryable, Associations, Debug)]
#[diesel(belongs_to(TagEntity, foreign_key = tag_id))]
#[diesel(belongs_to(FrontMatterEntity, foreign_key = front_matter_id))]
#[diesel(table_name = front_matter_taggable_join)]
#[diesel(primary_key(tag_id, front_matter_id))]
#[frb(ignore)]
pub struct TaggableWithFrontMatterJoin {
    pub tag_id: i32,
    pub front_matter_id: i32,
}
