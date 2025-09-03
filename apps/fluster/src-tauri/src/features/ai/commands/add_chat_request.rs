use chrono::Utc;
use futures::StreamExt;
use ollama_rs::{
    coordinator::Coordinator,
    error::OllamaError,
    generation::{
        chat::{request::ChatMessageRequest, ChatMessage, ChatMessageResponseStream, MessageRole},
        tools::implementations::{Calculator, DDGSearcher, Scraper},
    },
    models::ModelOptions,
    Ollama,
};
use std::sync::{Arc, Mutex};
use tauri::ipc::Channel;

use crate::{
    core::{
        database::db::get_database,
        events::event_props::AiChatMessageUpdateEventProps,
        sync::parse_directory::sync_fs_directory::models::sync_filesystem_options::AiSyncSettings,
        types::errors::errors::{FlusterError, FlusterResult},
        utils::random_utils::get_unique_id,
    },
    features::ai::data::{
        db::{
            ai_chat_entity::AiChatEntity,
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
    chat_id: String,
    ai: AiSyncSettings,
    chat_input: AiChatMessageModel,
    chat_history: Vec<AiChatMessageModel>,
    stream_channel: Channel<AiChatMessageUpdateEventProps>,
) -> FlusterResult<AiChatMessageModel> {
    // -- Get database & Ollama --
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let ollama = Ollama::default();
    // -- Read history from database --
    // -- Convert history from lancedb to ollama --

    let system_prompt = get_embedded_system_prompt(EmbeddedSystemPromptId::DefaultSystemPrompt);
    let mut history: Vec<ChatMessage> = vec![ChatMessage::new(MessageRole::System, system_prompt)];

    for history_item in chat_history {
        let role = match history_item.role {
            AiChatMessageRole::User => MessageRole::User,
            AiChatMessageRole::Assistant => MessageRole::Assistant,
            AiChatMessageRole::System => MessageRole::System,
            AiChatMessageRole::Tool => MessageRole::Tool,
        };
        history.push(ChatMessage::new(role, history_item.body));
    }

    // -- Setup Model Options --
    let chat_data = AiChatEntity::get_by_id(&db, &chat_id).await?;
    let model_options = ModelOptions::default()
        .repeat_penalty(chat_data.repeat_penalty)
        .top_k(chat_data.top_k)
        .top_p(chat_data.top_p)
        .temperature(chat_data.temperature);
    // TODO: Implement the chat with the coordinator here to enable tool calling.
    let mut coordinator =
        Coordinator::new(ollama.clone(), ai.language_model.clone(), history.clone())
            .options(model_options.clone())
            .add_tool(DDGSearcher::new())
            .add_tool(Scraper {})
            .add_tool(Calculator {});

    // let sent_at = Utc::now().timestamp_millis().to_string();

    AiChatMessageEntity::save_chat_request(&db, chat_input.clone()).await?;
    let response = coordinator
        .chat(vec![ChatMessage::user(chat_input.body.clone())])
        .await;

    if response.as_ref().is_err_and(|e| {
        println!(
            "Error in response here: {:?}",
            e.to_string().contains("does not support tools")
        );
        e.to_string().contains("does not support tools")
    }) {
        println!("In hizere");
        let _history = Arc::new(Mutex::new(history.clone()));
        let mut stream: ChatMessageResponseStream = ollama
            .send_chat_messages_with_history_stream(
                _history,
                ChatMessageRequest::new(
                    ai.language_model,
                    vec![ChatMessage::user(chat_input.body)],
                )
                .options(model_options),
            )
            .await
            .map_err(|e| {
                println!("Error in set_chat_messages_with_history_stream: {:?}", e);
                FlusterError::FailToLoadModel
            })?;

        let mut response = String::new();
        while let Some(Ok(res)) = stream.next().await {
            response += res.message.content.as_str();
            let _ = stream_channel
                .send(AiChatMessageUpdateEventProps {
                    chat_id: chat_id.clone(),
                    message_id: chat_input.id.clone(),
                    content: response.clone(),
                })
                .map_err(|e| {
                    println!("Error: {:?}", e);
                    FlusterError::FailToStreamFromRust
                });
        }

        let return_message_id = get_unique_id().await;
        let return_message = AiChatMessageModel {
            id: return_message_id,
            chat_id: chat_id.clone(),
            body: response,
            role: AiChatMessageRole::Assistant,
            sent_at: Utc::now().timestamp_millis().to_string(),
        };
        AiChatMessageEntity::save_chat_request(&db, return_message.clone()).await?;
        return Ok(return_message);
    }

    let return_message_id = get_unique_id().await;
    let response_message = AiChatMessageModel {
        id: return_message_id,
        chat_id: chat_id.clone(),
        body: match response {
            Ok(res) => res.message.content.clone(),
            Err(e) => {
                println!("Ollama Error: {:?}", e);
                String::from("")
            }
        },
        role: AiChatMessageRole::Assistant,
        sent_at: Utc::now().timestamp_millis().to_string(),
    };
    AiChatMessageEntity::save_chat_request(&db, response_message.clone()).await?;
    Ok(response_message)
}
