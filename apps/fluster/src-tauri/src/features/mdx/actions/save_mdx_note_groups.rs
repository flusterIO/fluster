use crate::{
    core::{
        database::db::get_database,
        sync::parse_directory::sync_fs_directory::sync_methods::clean::clean_database,
        types::errors::errors::FlusterResult,
    },
    features::mdx::data::{
        front_matter_entity::FrontMatterEntity, front_matter_model::FrontMatterModel,
        mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
        mdx_note_equation_model::MdxNoteEquationModel, mdx_note_group::MdxNoteGroup,
        mdx_note_model::MdxNoteModel, mdx_note_tag_entity::MdxNoteTagEntity,
        mdx_note_tag_model::MdxNoteTagModel,
    },
};

// FIXME: Bib entries are not being generated along with the mdx_note_bib_entry joining table.
pub async fn save_mdx_note_groups(groups: Vec<MdxNoteGroup>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    clean_database(&db).await?;
    // Loop over each item and generate the proper joining tables.
    let mut mdx_note_tag_models: Vec<MdxNoteTagModel> = Vec::new();
    let mut mdx_note_equations: Vec<MdxNoteEquationModel> = Vec::new();
    let mut notes: Vec<MdxNoteModel> = Vec::new();
    let mut front_matter: Vec<FrontMatterModel> = Vec::new();
    for item in groups {
        mdx_note_tag_models.extend(item.tags.iter().map(|x| MdxNoteTagModel {
            mdx_note_file_path: item.mdx.file_path.clone(),
            tag_value: x.value.clone(),
        }));
        mdx_note_equations.extend(item.equation_ids.iter().map(|x| MdxNoteEquationModel {
            mdx_note_file_path: item.mdx.file_path.clone(),
            equation_id: x.clone(),
        }));
        notes.push(item.mdx);
        front_matter.push(item.front_matter);
    }
    // Once everything is sorted and joining tables are created, save everything.
    MdxNoteEntity::save_many(notes, &db).await?;
    FrontMatterEntity::save_many(front_matter, &db).await?;
    MdxNoteTagEntity::save_many(mdx_note_tag_models, &db).await?;
    MdxNoteEquationEntity::save_many(mdx_note_equations, &db).await?;

    Ok(())
}
