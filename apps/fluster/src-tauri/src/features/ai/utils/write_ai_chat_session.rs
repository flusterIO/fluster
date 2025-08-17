use std::path::PathBuf;

use crate::core::{
    database::db::get_data_dir,
    types::errors::errors::{FlusterError, FlusterResult},
};

pub fn get_chat_session_dir() -> PathBuf {
    get_data_dir().unwrap().join("chat_history")
}

// TODO: This can be removed now that local AI is being managed by ollama
pub async fn write_chat_session(chat_id: &str, chat_data: &[u8]) -> FlusterResult<()> {
    let base_dir = get_chat_session_dir();
    if !std::fs::exists(&base_dir).is_ok_and(|x| x) {
        tokio::fs::create_dir_all(&base_dir).await.map_err(|e| {
            println!("Error: {:?}", e);
            FlusterError::FailToCopyFiles
        })?;
    }
    let p = base_dir.join(format!("{}.llama", chat_id));
    tokio::fs::write(p, chat_data).await.map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToWriteChatSession
    })
}
