use crate::core::{
    events::set_db_connection_uri::SetDbConnectionUri, types::errors::errors::FlusterError,
};
use sqlx::postgres::PgPoolOptions;
use tauri::{ipc::Channel, AppHandle, Emitter};

use super::db::{get_database, get_database_path};

pub async fn initialize_database(app: AppHandle, on_error: Channel<FlusterError>) {
    let db_res = get_database().await;
    let mut db = db_res.lock().await;
    if let Some(db_path) = get_database_path() {
        let exists = std::fs::exists(&db_path).is_ok_and(|x| x);
        let db_exists = db.database_exists("fluster").await.is_ok_and(|x| x);
        if !exists || !db_exists {
            let res = std::fs::create_dir_all(&db_path);
            if res.is_err() {
                log::error!("Creating the fluster managed database was unsuccessful.")
            }
            let setup_res = db.setup().await;
            if setup_res.is_err() {
                log::error!("An error occurred while attempting to initialize Fluster's database.");
            }
            let uri = db.full_db_uri("fluster");
            if let Ok(pool) = PgPoolOptions::new()
                .max_connections(5)
                .connect(&uri)
                .await
                .map_err(|_| FlusterError::FailToConnect)
            {
                let res = sqlx::migrate!("./migrations").run(&pool).await;
                if res.is_err() {
                    log::error!("Failed to initialize database.");
                } else {
                    log::info!("Successfully initialized database.");
                    pool.close().await;
                }
            } else {
                log::error!("Failed to initialize database.");
            }
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
