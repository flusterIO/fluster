use crate::{
    core::{
        models::taggable::{shared_taggable_model::SharedTaggableModel, tag_entity::TagEntity},
        types::{errors::errors::FlusterResult, FlusterDb},
    },
    features::math::data::{
        equation_model::{EquationData, EquationModel},
        equation_tag_entity::EquationTagEntity,
        equation_tag_model::EquationTagModel,
    },
};

pub async fn equations_to_equationdata(
    db: &FlusterDb<'_>,
    equations: &[EquationModel],
) -> FlusterResult<Vec<EquationData>> {
    let mut results: Vec<EquationData> = Vec::new();
    let equation_tags = EquationTagEntity::get_by_equation_ids(
        db,
        equations.iter().map(|x| x.id.clone()).collect(),
    )
    .await?;
    let tags = TagEntity::get_by_values(
        db,
        equation_tags.iter().map(|x| x.tag_value.clone()).collect(),
    )
    .await?;
    for equation in equations {
        let matching_equation_tags: Vec<EquationTagModel> = equation_tags
            .iter()
            .filter(|x| x.equation_id == equation.id)
            .cloned()
            .collect();
        let matching_tags: Vec<SharedTaggableModel> = tags
            .iter()
            .filter(|y| {
                matching_equation_tags
                    .iter()
                    .any(|x| x.tag_value == y.value)
            })
            .cloned()
            .collect();
        results.push(EquationData {
            equation: equation.clone(),
            tags: matching_tags,
        });
    }
    Ok(results)
}
