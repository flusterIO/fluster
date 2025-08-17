use std::sync::{Arc, Mutex};

use chrono::Utc;
use futures::StreamExt;
use ollama_rs::{
    generation::chat::{
        request::ChatMessageRequest, ChatMessage, ChatMessageResponseStream, MessageRole,
    },
    Ollama,
};
use tauri::{AppHandle, Emitter};

use crate::{
    core::{
        database::db::get_database,
        events::{
            event_keys::CrossLanguageEvents,
            event_props::AiChatMessageUpdateEventProps,
        },
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::AiSyncSettings,
        types::errors::errors::{FlusterError, FlusterResult},
        utils::random_utils::get_unique_id,
    },
    features::ai::data::{
        db::{
            ai_chat_message_entity::AiChatMessageEntity,
            ai_chat_message_model::{AiChatMessageModel, AiChatMessageRole},
        },
        embedded_system_prompts::{get_embedded_system_prompt, EmbeddedSystemPromptId},
    },
};

/// Until dates can be parsed on the rust side, the history must be passed in already sorted by
/// date.
#[tauri::command]
#[specta::specta]
pub async fn add_ai_chat_request(
    app: AppHandle,
    chat_id: String,
    ai: AiSyncSettings,
    chat_input: AiChatMessageModel,
    chat_history: Vec<AiChatMessageModel>,
) -> FlusterResult<()> {
    // -- Get database & Ollama --
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let ollama = Ollama::default();
    // -- Read history from database --
    // -- Convert history from lancedb to ollama --

    let system_prompt = get_embedded_system_prompt(EmbeddedSystemPromptId::DefaultSystemPrompt);
    let mut _history: Vec<ChatMessage> = vec![ChatMessage::new(MessageRole::System, system_prompt)];

    for history_item in chat_history {
        let role = match history_item.role {
            AiChatMessageRole::User => MessageRole::User,
            AiChatMessageRole::Assistant => MessageRole::Assistant,
            AiChatMessageRole::System => MessageRole::System,
            AiChatMessageRole::Tool => MessageRole::Tool,
        };
        _history.push(ChatMessage {
            role,
            content: history_item.body,
            tool_calls: Vec::new(),
            images: None,
        });
    }

    let history: Arc<Mutex<Vec<ChatMessage>>> = Arc::new(Mutex::new(_history));

    // let sent_at = Utc::now().timestamp_millis().to_string();

    AiChatMessageEntity::save_chat_request(&db, chat_input.clone()).await?;
    let mut stream: ChatMessageResponseStream = ollama
        .send_chat_messages_with_history_stream(
            history.clone(),
            ChatMessageRequest::new(ai.language_model, vec![ChatMessage::user(chat_input.body)]),
        )
        .await
        .map_err(|e| {
            println!("Error in set_chat_messages_with_history_stream: {:?}", e);
            FlusterError::FailToLoadModel
        })?;

    let mut response = String::new();
    while let Some(Ok(res)) = stream.next().await {
        response += res.message.content.as_str();
        app.emit(
            &CrossLanguageEvents::AiChatMessageUpdate.to_string(),
            AiChatMessageUpdateEventProps {
                chat_id: chat_id.clone(),
                message_id: chat_input.id.clone(),
                content: response.clone(),
            },
        )
        .map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToSendEvent
        })?;
    }

    let return_message_id = get_unique_id().await;
    AiChatMessageEntity::save_chat_request(
        &db,
        AiChatMessageModel {
            id: return_message_id,
            chat_id: chat_id.clone(),
            body: response,
            role: AiChatMessageRole::Assistant,
            sent_at: Utc::now().timestamp_millis().to_string(),
        },
    )
    .await?;
    Ok(())
}
