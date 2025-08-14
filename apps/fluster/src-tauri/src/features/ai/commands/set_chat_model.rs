use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::db::{ai_chat_entity::AiChatEntity, ai_chat_model::AiChatModel},
};

/// Sets the language model for a specific chat session.
#[tauri::command]
#[specta::specta]
pub async fn set_chat_model(chat_id: String, model_name: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let chat = AiChatEntity::get_by_id(&db, &chat_id).await?;
    AiChatEntity::save_many(
        &db,
        vec![AiChatModel {
            model: model_name,
            ..chat
        }],
    )
    .await?;
    Ok(())
}
