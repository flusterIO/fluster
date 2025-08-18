use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::db::{
        ai_chat_entity::AiChatEntity, ai_chat_message_entity::AiChatMessageEntity,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn delete_chat_by_id(chat_id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    AiChatEntity::delete_by_id(&db, chat_id.clone()).await?;
    AiChatMessageEntity::delete_by_chat_id(&db, &chat_id).await?;
    Ok(())
}
