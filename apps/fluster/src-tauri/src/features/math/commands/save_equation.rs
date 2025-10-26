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

#[tauri::command]
#[specta::specta]
pub async fn save_equation(item: EquationData) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    // if item.equation.equation_id.is_some() {
    //     let equation_id_exists =
    //         EquationEntity::equation_id_exists(&db, item.equation.equation_id.as_ref().unwrap())
    //             .await?;
    //     if equation_id_exists {
    //         let res = toast_channel.send(ToastConfig {
    //             title: String::from("Duplicate id's."),
    //             variant: ToastVariant::Error,
    //             duration: 5000,
    //             body: String::from(
    //                 "The id field you provided is already applied to another equation",
    //             ),
    //             id: get_unique_id().await,
    //         });
    //         if res.is_err() {
    //             println!("Error in save equation: {:?}", res.err());
    //         }
    //         return Err(FlusterError::DuplicateId);
    //     }
    // }
    EquationEntity::save_many(&db, vec![item.equation.clone()]).await?;
    // let equation_tag_to_delete: Vec<SharedTaggableModel> = Vec::new();
    // -- Get existing tags
    let existing_equation_tags =
        EquationTagEntity::get_by_equation_ids(&db, vec![item.equation.id.clone()]).await?;
    let existing_tags = TagEntity::get_by_values(
        &db,
        existing_equation_tags
            .iter()
            .map(|x| x.tag_value.clone())
            .collect(),
    )
    .await?;
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

    // -- Make sure Tags are saved along side EquationTags if it does not exist.
    let new_tags = tag_values_to_save
        .iter()
        .filter(|x| {
            let tag_exists = existing_tags.iter().any(|y| y.value == **x);
            !tag_exists
        })
        .collect::<Vec<&String>>();
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

    println!("Here 6");
    // -- Delete EquationTags determined to no longer be needed. Tags should not be deleted as
    // they may be used elsewhere.
    EquationTagEntity::delete_items(&db, tag_values_to_delete, &item.equation.id).await?;

    println!("Here 7");
    Ok(())
}

#[cfg(test)]
mod tests {
    use tauri::ipc::Channel;

    use crate::{
        core::utils::random_utils::get_unique_id,
        features::math::data::equation_model::EquationModel,
    };

    use super::*;

    #[tokio::test]
    async fn saves_equation_successfully() {
        let now = Utc::now().timestamp_millis().to_string();
        let data = EquationData {
            tags: Vec::new(),
            equation: EquationModel {
                id: get_unique_id().await,
                body: String::from("e=mc^2"),
                desc: String::from(""),
                label: String::from("My equation"),
                ctime: now.clone(),
                utime: now.clone(),
                equation_id: Some(String::from("my_equation_id")),
            },
        };
        let res = save_equation(data).await;
        assert!(res.is_ok(), "Saves equation without throwing an id");
        // assert_eq!(result, 4);
    }
}
