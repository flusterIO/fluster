use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::{
        db::{ai_chat_entity::AiChatEntity, ai_chat_message_entity::AiChatMessageEntity},
        models::ai_chat_data::AiChatData,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_ai_chat_by_id(chat_id: String) -> FlusterResult<AiChatData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let chat = AiChatEntity::get_by_id(&db, &chat_id).await?;
    let messages = AiChatMessageEntity::get_by_chat_id(&db, &chat_id).await?;

    println!("Messages: {:?}", messages);
    Ok(AiChatData { chat, messages })
}
