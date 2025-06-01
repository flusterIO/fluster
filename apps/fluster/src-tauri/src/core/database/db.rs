use std::path::PathBuf;

use crate::core::types::errors::errors::FlusterError;
use crate::core::types::errors::errors::FlusterResult;
use crate::core::types::FlusterDbRaw;
use lancedb::{connect, Connection};
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::OnceCell;

static DB: OnceCell<Arc<Mutex<FlusterDbRaw>>> = OnceCell::const_new();

pub fn get_data_dir() -> FlusterResult<PathBuf> {
    let mut d = dirs::data_local_dir();
    if d.is_none() {
        d = dirs::data_local_dir();
    }
    if d.is_none() {
        log::error!("Failed to get a databse path for your operating system. Something is likely configured terribly wrong.");
        return Err(FlusterError::FailToFindDataDirectory);
    }
    return Ok(d.unwrap().join("Fluster").join("data"));
}

pub fn get_database_path() -> FlusterResult<PathBuf> {
    let d = get_data_dir()?;
    Ok(d.join("database"))
}

pub async fn get_database() -> Arc<Mutex<Connection>> {
    DB.get_or_init(|| async {
        let db_path = get_database_path().unwrap();
        let db = connect(db_path.to_str().unwrap())
            .execute()
            .await
            .expect("Failed to connect to database.");
        Arc::new(Mutex::new(db))
    })
    .await
    .clone()
}
