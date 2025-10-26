use chrono::Utc;

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::snippets::data::{
        snippet_model::SnippetData, snippet_tag_entity::SnippetTagEntity,
        snippet_tag_model::SnippetTagModel,
    },
};

use super::data::snippet_entity::SnippetEntity;

/// Note that the values are all in array's and that tags is a 2d array. This is so that for each
/// index in the snippets array, there is an array at that index in the tags array with the tags
/// the snippet at that index contains.
/// While it's weird to think about a database's data in this way, this very similar to how pandas and
/// polars handle their data.
#[tauri::command]
#[specta::specta]
pub async fn save_snippet(item: SnippetData) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    SnippetEntity::save_many(vec![item.snippet.clone()], &db).await?;
    // -- Get existing tags
    let existing_snippet_tags =
        SnippetTagEntity::get_by_snippet_ids(&db, vec![item.snippet.id.clone()]).await?;

    // -- Organize tags based on whether or not they need to be saved or deleted, or just
    // ignore if they already exist.
    let mut tag_values_to_remove: Vec<String> = Vec::new();
    let mut tag_values_to_save: Vec<SnippetTagModel> = Vec::new();
    for item_tag in item.tags.clone() {
        let equation_tag_exists = existing_snippet_tags
            .iter()
            .any(|x| x.snippet_id == item.snippet.id && x.tag_value == item_tag.tag_value);
        if !equation_tag_exists {
            tag_values_to_save.push(item_tag.clone());
        }
    }
    for existing_tag in &existing_snippet_tags {
        let tag_should_stay = item.tags.iter().any(|x| {
            x.tag_value == existing_tag.tag_value && existing_tag.snippet_id == item.snippet.id
        });
        if !tag_should_stay {
            tag_values_to_remove.push(existing_tag.tag_value.to_string());
        }
    }

    // -- Save snippet tags determined to need to be saved
    SnippetTagEntity::create_many(&db, tag_values_to_save.clone()).await?;

    // -- Make sure tags are saved alongside EquationTags if they do not exist
    let existing_tags = TagEntity::get_by_values(
        &db,
        existing_snippet_tags
            .iter()
            .map(|x| x.tag_value.clone())
            .collect(),
    )
    .await?;
    let new_tags = tag_values_to_save
        .iter()
        .filter_map(|x| {
            let tag_exists = existing_tags.iter().any(|y| y.value == x.tag_value);
            if tag_exists {
                None
            } else {
                Some(x.tag_value.clone())
            }
        })
        .collect::<Vec<String>>();

    let now = Utc::now().timestamp_millis().to_string();

    if !new_tags.is_empty() {
        TagEntity::save_many(
            &db,
            new_tags
                .iter()
                .map(|x| SharedTaggableModel {
                    value: x.to_string(),
                    utime: now.clone(),
                })
                .collect(),
        )
        .await?;
    }

    // -- Delete TaskTags if determined to be deleted. Tags should not be deleted as they may
    // be used elsewhere.
    if !tag_values_to_remove.is_empty() {
        SnippetTagEntity::delete_by_tag_values(&db, tag_values_to_remove, &item.snippet.id).await?;
    }

    Ok(())
}
