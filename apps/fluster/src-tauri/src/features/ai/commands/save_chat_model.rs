use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::db::{ai_chat_entity::AiChatEntity, ai_chat_model::AiChatModel},
};

/// Sets the language model for a specific chat session.
#[tauri::command]
#[specta::specta]
pub async fn save_chat_model(chat_model: AiChatModel) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AiChatEntity::save_many(&db, vec![chat_model]).await?;
    Ok(())
}
