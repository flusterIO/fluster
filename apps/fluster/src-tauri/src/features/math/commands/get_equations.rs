use crate::{
    core::{
        database::db::get_database,
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::errors::errors::FlusterResult,
    },
    features::math::data::{
        equation_entity::EquationEntity, equation_model::EquationData,
        equation_tag_entity::EquationTagEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_equations() -> FlusterResult<Vec<EquationData>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let equations = EquationEntity::get_many(&db).await?;
    let equation_tags = EquationTagEntity::get_by_equation_ids(
        &db,
        equations.iter().map(|x| x.id.clone()).collect(),
    )
    .await?;
    let tags = TagEntity::get_by_values(
        &db,
        equation_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    let mut items: Vec<EquationData> = Vec::new();
    for equation in equations {
        let item_tag_values = equation_tags
            .iter()
            .filter_map(|x| -> Option<String> {
                if x.equation_id == equation.id {
                    Some(x.tag_value.clone())
                } else {
                    None
                }
            })
            .collect::<Vec<String>>();
        let item_tags = tags
            .iter()
            .filter_map(|x| {
                if item_tag_values.contains(&x.value) {
                    Some(x.clone())
                } else {
                    None
                }
            })
            .collect::<Vec<SharedTaggableModel>>();
        items.push(EquationData {
            equation,
            tags: item_tags,
        })
    }
    Ok(items)
}
