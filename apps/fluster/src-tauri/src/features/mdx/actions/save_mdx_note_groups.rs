use crate::{
    core::{
        sync::parse_directory::sync_fs_directory::sync_methods::clean::clean_database,
        types::{errors::errors::FlusterResult, FlusterDb},
    },
    features::mdx::data::{
        front_matter_entity::FrontMatterEntity, front_matter_model::FrontMatterModel,
        mdx_note_entity::MdxNoteEntity, mdx_note_equation_model::MdxNoteEquationModel,
        mdx_note_group::MdxNoteGroup, mdx_note_model::MdxNoteModel,
        mdx_note_tag_model::MdxNoteTagModel,
    },
};

pub async fn save_mdx_note_groups(
    db: &FlusterDb<'_>,
    groups: Vec<MdxNoteGroup>,
) -> FlusterResult<()> {
    clean_database(db).await?;
    // Loop over each item and generate the proper joining tables.
    let mut mdx_note_tag_models: Vec<MdxNoteTagModel> = Vec::new();
    let mut mdx_note_equations: Vec<MdxNoteEquationModel> = Vec::new();
    let mut notes: Vec<MdxNoteModel> = Vec::new();
    // RESUME: Come back here and save the tag and mdxtag joining table to begin working on tag
    // based searching. That played a big part in the initial app.
    let mut front_matter: Vec<FrontMatterModel> = Vec::new();
    for item in groups {
        mdx_note_tag_models.extend(item.tags.iter().map(|x| MdxNoteTagModel {
            mdx_note_file_path: item.mdx.file_path.clone(),
            tag_value: x.value.clone(),
        }));
        mdx_note_equations.extend(item.equations.iter().map(|x| MdxNoteEquationModel {
            mdx_note_file_path: item.mdx.file_path.clone(),
            equation_id: x.id.clone(),
        }));
        notes.push(item.mdx);
        front_matter.push(item.front_matter);
    }
    // Once everything is sorted and joining tables are created, save everything.
    MdxNoteEntity::save_many(notes, db).await?;
    FrontMatterEntity::save_many(front_matter, db).await?;
    // MdxNoteTagEntity::create_many(&db, mdx_note_tag_models).await?;
    // MdxNoteEquationEntity::save_many(mdx_note_equations, &db).await?;

    Ok(())
}
