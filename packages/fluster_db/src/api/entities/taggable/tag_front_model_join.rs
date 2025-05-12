use super::tag_model::TagCreatable;

pub struct TaggableWithFrontMatterJoin {
    pub tag: TagCreatable,
    pub front_matter_id: i32,
}
