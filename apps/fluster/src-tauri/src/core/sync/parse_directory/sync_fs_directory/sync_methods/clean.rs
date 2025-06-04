use crate::{
    core::types::{errors::errors::FlusterResult, FlusterDb},
    features::mdx::data::{
        front_matter_entity::FrontMatterEntity, mdx_note_entity::MdxNoteEntity,
        mdx_note_equation_entity::MdxNoteEquationEntity, mdx_note_tag_entity::MdxNoteTagEntity,
    },
};

/// Removes all entities from the database that can be regenerated from mdx, bib or other
/// synchronized content.
pub async fn clean_database(db: &FlusterDb<'_>) -> FlusterResult<()> {
    // Clean all tables that can be regenerated from note content.
    MdxNoteEntity::clean(&db).await?;
    FrontMatterEntity::clean(&db).await?;
    MdxNoteTagEntity::clean(&db).await?;
    MdxNoteEquationEntity::clean(&db).await?;
    Ok(())
}
