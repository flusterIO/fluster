use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::math::data::{
        equation_snippet_entity::EquationSnippetEntity,
        equation_snippet_model::EquationSnippetModel,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn delete_equation_snippet(data: EquationSnippetModel) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    EquationSnippetEntity::delete(&db, data).await
}
