use crate::core::types::errors::errors::{FlusterError, FlusterResult};

use super::write_ai_chat_session::get_chat_session_dir;

pub async fn read_chat_session(chat_id: &str) -> FlusterResult<Vec<u8>> {
    let p = get_chat_session_dir().join(format!("{}.llama", chat_id));
    if !std::fs::exists(&p).is_ok_and(|x| x) {
        return Err(FlusterError::FailToFind);
    }
    tokio::fs::read(p).await.map_err(|e| {
        println!("Error: {:?}", e);
        FlusterError::FailToReadChatSession
    })
}
