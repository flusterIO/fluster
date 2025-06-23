use crate::{
    core::{
        database::db::get_database,
        types::errors::errors::{FlusterError, FlusterResult},
    },
    features::ai::{
        data::db::ai_chat_entity::AiChatEntity, utils::write_ai_chat_session::get_chat_session_dir,
    },
};

#[tauri::command]
#[specta::specta]
pub async fn delete_chat_by_id(chat_id: String) -> FlusterResult<()> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let p = get_chat_session_dir().join(format!("{}.llama", chat_id));
    if std::fs::exists(&p).is_ok_and(|x| x) {
        tokio::fs::remove_file(p).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCopyFiles
        })?;
    }
    AiChatEntity::delete_by_id(&db, chat_id).await
}
