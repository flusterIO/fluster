use crate::core::{events::show_toast::ShowToast, types::errors::errors::FlusterError};
use tauri::{ipc::Channel, AppHandle, Emitter};

use super::db::get_pg_embed;

pub async fn initialize_database(
    app: AppHandle,
    on_error: Channel<FlusterError>,
) -> Option<FlusterError> {
    if let Ok(mut pg) = get_pg_embed().await {
        let db_name = "fluster";
        let db_exists = pg.database_exists("fluster").await;
        if !db_exists.is_ok_and(|x| x) {
            pg.setup()
                .await
                .map_err(|_| FlusterError::FailToConnect)
                .expect("Setup database successfully.");
            let e = pg.create_database(&db_name).await;
            if e.is_err() {
                log::error!("Failed to initialize embedded postgres instance.");
                let event = ShowToast::new(
                    "Error".to_string(),
                    "Fluster failed to initialize the embedded database".to_string(),
                    5000,
                    crate::core::events::show_toast::ToastVariant::Error,
                );
                app.emit("show-toast", event);
                // emit()
                on_error.send(FlusterError::FailToConnect);
            }
        }
        let e = ShowToast::new(
            "Success".to_string(),
            "Fluster successfully setup your database.".to_string(),
            5000,
            crate::core::events::show_toast::ToastVariant::Success,
        );
        app.emit("show-toast", e);
        None
    } else {
        Some(FlusterError::FailToConnect)
    }
}
