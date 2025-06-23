use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::db::{ai_chat_entity::AiChatEntity, ai_chat_model::AiChatModel},
};

#[tauri::command]
#[specta::specta]
pub async fn get_all_ai_chats() -> FlusterResult<Vec<AiChatModel>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AiChatEntity::get_all(&db).await
}
