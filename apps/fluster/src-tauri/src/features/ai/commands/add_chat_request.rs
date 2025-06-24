use chrono::Utc;
use kalosm::language::*;
use log::error;

use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::ai::{
        data::{
            db::{
                ai_chat_request_entity::AiChatRequestEntity,
                ai_chat_request_model::AiChatRequestMessageModel,
                ai_chat_response_entity::AiChatResponseEntity,
                ai_chat_response_model::AiChatResponseMessageModel,
            },
            embedded_system_prompts::{get_embedded_system_prompt, EmbeddedSystemPromptId},
        },
        utils::{
            read_ai_chat_session::read_chat_session, write_ai_chat_session::write_chat_session,
        },
    },
};

#[tauri::command]
#[specta::specta]
pub async fn add_ai_chat_request(
    chat_id: String,
    chat_input: String,
) -> FlusterResult<AiChatResponseMessageModel> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    // Save incoming message here.
    let sent_at = Utc::now().timestamp_millis().to_string();
    let outgoing_request = AiChatRequestMessageModel {
        id: uuid::Uuid::new_v4().to_string(),
        chat_id: chat_id.clone(),
        body: chat_input.clone(),
        sent_at,
    };
    AiChatRequestEntity::save_chat_request(&db, outgoing_request.clone()).await?;
    let model = Llama::new_chat().await.map_err(|e| {
        error!("Error: {:?}", e);
        FlusterError::FailToLoadModel
    })?;
    let system_prompt = get_embedded_system_prompt(EmbeddedSystemPromptId::DefaultSystemPrompt);
    let mut chat = model.chat().with_system_prompt(system_prompt);

    if let Ok(session_data) = read_chat_session(&chat_id).await {
        let session = ChatSession::from_bytes(&session_data).unwrap();
        chat = chat.with_session(session);
    }
    let res = chat.add_message(chat_input).await.map_err(|e| {
        error!("Error: {:?}", e);
        FlusterError::FailToLoadModel
    })?;

    if let Ok(new_session) = chat.session() {
        if let Ok(session_bytes) = new_session.to_bytes() {
            write_chat_session(&chat_id, &session_bytes).await?;
        }
    }
    let received_at = Utc::now().timestamp_millis().to_string();
    // Save outgoing message here before sending response
    let incoming_response = AiChatResponseMessageModel {
        id: uuid::Uuid::new_v4().to_string(),
        chat_id,
        body: res,
        received_at,
    };
    AiChatResponseEntity::save_chat_response(&db, incoming_response.clone()).await?;
    Ok(incoming_response)
}
