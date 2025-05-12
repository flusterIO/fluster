use super::tag_model::TagCreatable;

pub struct TaggableWithMdxNoteJoin {
    pub tag: TagCreatable,
    pub mdx_note_id: i32,
}
