use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::{
        flashcard::data::models::{
            flashcard_entity::FlashcardEntity, flashcard_tag_entity::FlashcardTagEntity,
        },
        math::data::{
            equation_entity::EquationEntity, equation_model::EquationData,
            equation_tag_entity::EquationTagEntity, equation_tag_model::EquationTagModel,
        },
        mdx::{
            data::{mdx_note_entity::MdxNoteEntity, mdx_note_tag_entity::MdxNoteTagEntity},
            methods::mdx_note_models_to_mdx_note_groups::mdx_note_models_to_mdx_note_groups,
        },
        snippets::data::{
            snippet_entity::SnippetEntity, snippet_model::SnippetData,
            snippet_tag_entity::SnippetTagEntity, snippet_tag_model::SnippetTagModel,
        },
        taggables::data::taggable_search_results::TraditionalSearchResults,
        task_manager::{task_entity::TaskEntity, task_tag_entity::TaskTagEntity},
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_tag_search_results(
    tag_values: Vec<String>,
) -> FlusterResult<TraditionalSearchResults> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let mdx_note_tags = MdxNoteTagEntity::get_by_tag_values(&db, &tag_values).await?;
    let task_tags = TaskTagEntity::get_by_values(&db, tag_values.clone()).await?;
    let tasks =
        TaskEntity::get_by_ids(&db, task_tags.iter().map(|x| x.task_id.clone()).collect()).await?;
    let mdx_notes = MdxNoteEntity::get_by_file_paths(
        &db,
        mdx_note_tags
            .iter()
            .map(|x| x.mdx_note_file_path.clone())
            .collect(),
    )
    .await?;
    let notes = mdx_note_models_to_mdx_note_groups(&db, mdx_notes).await?;

    let equation_tags = EquationTagEntity::get_by_tag_values(&db, tag_values.clone()).await?;

    let equations = EquationEntity::get_by_ids(
        &db,
        equation_tags
            .iter()
            .map(|x| x.equation_id.clone())
            .collect(),
    )
    .await?;

    let all_equation_tags = EquationTagEntity::get_by_equation_ids(
        &db,
        equations.iter().map(|x| x.id.clone()).collect(),
    )
    .await?;

    let all_tags = TagEntity::get_by_values(
        &db,
        all_equation_tags
            .iter()
            .map(|x| x.tag_value.clone())
            .collect(),
    )
    .await?;

    let mut equation_data_items: Vec<EquationData> = Vec::new();

    for equation in equations {
        let matching_equation_tags = all_equation_tags
            .iter()
            .filter(|x| x.equation_id == equation.id)
            .collect::<Vec<&EquationTagModel>>();
        let matching_tags = all_tags
            .iter()
            .filter_map(|x| {
                if matching_equation_tags
                    .iter()
                    .any(|y| y.tag_value == x.value)
                {
                    Some(x.clone())
                } else {
                    None
                }
            })
            .collect::<Vec<SharedTaggableModel>>();
        equation_data_items.push(EquationData {
            equation,
            tags: matching_tags,
        });
    }

    let snippet_tags = SnippetTagEntity::get_by_values(&db, tag_values.clone()).await?;

    let snippets = SnippetEntity::get_by_ids(
        &db,
        snippet_tags.iter().map(|x| x.snippet_id.clone()).collect(),
    )
    .await?;

    let mut snippet_data_items: Vec<SnippetData> = Vec::new();

    for snippet in snippets {
        let matching_snippet_tags = snippet_tags
            .iter()
            .filter_map(|x| {
                if x.snippet_id == snippet.id {
                    Some(x.clone())
                } else {
                    None
                }
            })
            .collect::<Vec<SnippetTagModel>>();
        snippet_data_items.push(SnippetData {
            snippet,
            tags: matching_snippet_tags,
        })
    }

    let flashcard_tags = FlashcardTagEntity::get_by_tag_values(&db, &tag_values).await?;

    let mut flashcards = Vec::new();

    if !flashcard_tags.is_empty() {
        flashcards = FlashcardEntity::get_by_ids(
            &db,
            flashcard_tags
                .iter()
                .map(|flashcard_tag| flashcard_tag.flashcard_id.clone())
                .collect(),
        )
        .await?;
    }

    Ok(TraditionalSearchResults {
        notes,
        flashcards,
        tasks,
        equations: equation_data_items,
        snippets: snippet_data_items,
    })
}
