use crate::{
    core::{
        database::db::get_database, models::taggable::tag_entity::TagEntity,
        types::errors::errors::FlusterResult,
    },
    features::{
        math::{
            data::{equation_entity::EquationEntity, equation_model::EquationData},
            utils::equations_to_equationdata::equations_to_equationdata,
        },
        mdx::{
            data::{
                mdx_note_entity::MdxNoteEntity, mdx_note_equation_entity::MdxNoteEquationEntity,
            },
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
    },
};

/// Accepts the user defined equation_id field, not the auto-generated id.
#[tauri::command]
#[specta::specta]
pub async fn get_notes_by_equation_id(
    equation_id: String,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    println!("Equation id: {:?}", equation_id.clone());
    let mdx_note_equations =
        MdxNoteEquationEntity::get_by_equation_entry_id(&db, &equation_id).await?;
    println!(
        "Note Equation length: {:?}",
        mdx_note_equations.clone().len()
    );
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_equations
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    println!("Notes length: {:?}", mdx_notes.clone().len());
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

    let equations = EquationEntity::get_by_user_provided_ids(&db, vec![equation_id]).await?;

    let equation_data = equations_to_equationdata(&db, &equations).await?;

    Ok(TraditionalSearchResults {
        notes,
        tasks: Vec::new(),
        equations: equation_data,
        snippets: Vec::new(),
    })
}
