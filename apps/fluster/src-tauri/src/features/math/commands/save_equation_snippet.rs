use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::{
        equation_snippet_entity::EquationSnippetEntity,
        equation_snippet_model::EquationSnippetModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn save_equation_snippet(data: Vec<EquationSnippetModel>) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationSnippetEntity::save(&db, data).await
}
