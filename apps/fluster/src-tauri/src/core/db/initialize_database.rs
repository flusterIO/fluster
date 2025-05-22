use crate::core::{
    events::set_db_connection_uri::SetDbConnectionUri, types::errors::errors::FlusterError,
};
use tauri::{ipc::Channel, AppHandle, Emitter};

use super::db::{get_database, get_database_path};

pub async fn initialize_database(app: AppHandle, on_error: Channel<FlusterError>) {
    let db = get_database().await;
    if let Some(db_path) = get_database_path() {
        let exists = std::fs::exists(&db_path).is_ok_and(|x| x);
        if !exists {
            std::fs::create_dir_all(&db_path);
        }
    } else {
        on_error.send(FlusterError::FailToConnect);
        log::error!("Failed to establish a local database connection. If you are using a common operating system and still encounter this error, please file an issue on Github.");
    }
    app.emit(
        "set-db-uri",
        SetDbConnectionUri {
            uri: db.full_db_uri("fluster"),
        },
    );
}
