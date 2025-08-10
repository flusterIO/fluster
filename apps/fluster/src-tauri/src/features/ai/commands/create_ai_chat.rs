use chrono::Utc;

use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::ai::data::db::{ai_chat_entity::AiChatEntity, ai_chat_model::AiChatModel},
};

#[tauri::command]
#[specta::specta]
pub async fn create_new_ai_chat(label: String, model: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let model = AiChatModel {
        label,
        id: uuid::Uuid::new_v4().to_string(),
        ctime: Utc::now().timestamp_millis().to_string(),
        model,
    };
    AiChatEntity::save_many(&db, vec![model]).await
}
