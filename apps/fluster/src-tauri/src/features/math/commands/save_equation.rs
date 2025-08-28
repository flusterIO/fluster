use chrono::Utc;

use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::math::data::{
        equation_entity::EquationEntity, equation_model::EquationData,
        equation_tag_entity::EquationTagEntity, equation_tag_model::EquationTagModel,
    },
};

// RESUME: Come back here and handle the saving of tags with the equation.
#[tauri::command]
#[specta::specta]
pub async fn save_equation(item: EquationData) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationEntity::save_many(&db, vec![item.equation.clone()]).await?;
    // let equation_tag_to_delete: Vec<SharedTaggableModel> = Vec::new();
    // -- Get existing tags
    let existing_equation_tags =
        EquationTagEntity::get_by_equation_ids(&db, vec![item.equation.id.clone()]).await?;
    println!("Here 1");
    let existing_tags = TagEntity::get_by_values(
        &db,
        existing_equation_tags
            .iter()
            .map(|x| x.tag_value.clone())
            .collect(),
    )
    .await?;
    println!("Here 2");
    // -- Organize tags based on whether or not they already exist, determining which values
    // are new and which need to be removed.
    let mut tag_values_to_save: Vec<String> = Vec::new();
    let mut tag_values_to_delete: Vec<String> = Vec::new();
    for item_tag in item.tags.clone() {
        let equation_tag_exists = existing_equation_tags
            .iter()
            .any(|x| x.equation_id == item.equation.id && x.tag_value == item_tag.value);
        if !equation_tag_exists {
            tag_values_to_save.push(item_tag.value.clone());
        }
    }
    for existing_tag in existing_equation_tags {
        let tag_should_stay = item.tags.iter().any(|x| {
            x.value == existing_tag.tag_value && existing_tag.equation_id == item.equation.id
        });
        if !tag_should_stay {
            tag_values_to_delete.push(existing_tag.tag_value.clone());
        }
    }
    println!("Here 3 {:?}", tag_values_to_save.clone().len());
    // -- Save equation tags determined to need to be saved
    EquationTagEntity::create_many(
        &db,
        tag_values_to_save
            .iter()
            .map(|x| EquationTagModel {
                tag_value: x.to_string(),
                equation_id: item.equation.id.clone(),
            })
            .collect(),
    )
    .await?;

    println!("Here 4");
    // -- Make sure Tags are saved along side EquationTags if it does not exist.
    let new_tags = tag_values_to_save
        .iter()
        .filter(|x| {
            let tag_exists = existing_tags.iter().any(|y| y.value == **x);
            !tag_exists
        })
        .collect::<Vec<&String>>();
    let now = Utc::now().timestamp_millis().to_string();
    println!("Here 5");

    if !new_tags.is_empty() {
        TagEntity::save_many(
            &db,
            new_tags
                .iter()
                .map(|x| SharedTaggableModel {
                    value: x.to_string(),
                    ctime: now.clone(),
                })
                .collect(),
        )
        .await?;
    }

    println!("Here 6");
    // -- Delete EquationTags determined to no longer be needed. Tags should not be deleted as
    // they may be used elsewhere.
    EquationTagEntity::delete_items(&db, tag_values_to_delete, &item.equation.id).await?;

    println!("Here 7");
    Ok(())
}
