use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::{
        db::{
            ai_chat_entity::AiChatEntity, ai_chat_request_entity::AiChatRequestEntity,
            ai_chat_response_entity::AiChatResponseEntity,
        },
        models::ai_chat_data::AiChatData,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn get_ai_chat_by_id(chat_id: String) -> FlusterResult<AiChatData> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let chat = AiChatEntity::get_by_id(&db, &chat_id).await?;
    let outgoing_messages = AiChatRequestEntity::get_by_chat_id(&db, &chat_id)
        .await
        .unwrap_or(Vec::new());

    let incoming_messages = AiChatResponseEntity::get_by_chat_id(&db, &chat_id)
        .await
        .unwrap_or(Vec::new());
    Ok(AiChatData {
        chat,
        outgoing: outgoing_messages,
        incoming: incoming_messages,
    })
}
