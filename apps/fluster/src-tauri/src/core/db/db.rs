use std::path::PathBuf;

use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use postgresql_embedded::VersionReq;
use postgresql_embedded::{PostgreSQL, Settings};
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::OnceCell;

static DB: OnceCell<Arc<Mutex<PostgreSQL>>> = OnceCell::const_new();

pub fn get_database_port() -> u16 {
    match std::env::var("FLUSTER_DATABASE_PORT") {
        Ok(x) => {
            if let Ok(n) = x.parse() {
                n
            } else {
                21521
            }
        }
        Err(_) => 21521,
    }
}

pub fn get_database_password() -> String {
    match std::env::var("FLUSTER_DATABASE_PASSWORD") {
        Ok(x) => {
            if !x.is_empty() {
                x
            } else {
                "password".to_string()
            }
        }
        Err(_) => "password".to_string(),
    }
}

pub fn get_database_user_name() -> String {
    match std::env::var("FLUSTER_DATABASE_USER") {
        Ok(x) => {
            if !x.is_empty() {
                x
            } else {
                "postgres".to_string()
            }
        }
        Err(_) => "postgres".to_string(),
    }
}

pub fn get_database_uri() -> String {
    format!(
        "postgresql://{}:{}@localhost:{}/fluster",
        get_database_user_name(),
        get_database_password(),
        get_database_port()
    )
}

pub fn get_database_path() -> Option<PathBuf> {
    let mut d = dirs::data_dir();
    if d.is_none() {
        d = dirs::data_local_dir();
    }
    if d.is_none() {
        log::error!("Failed to get a databse path for your operating system. Something is likely configured terribly wrong.");
        return None;
    }
    Some(d.unwrap().join("Fluster").join("data").join("database"))
}

pub fn get_database_settings() -> FlusterResult<Settings> {
    let dpath = get_database_path();
    if dpath.is_none() {
        return Err(FlusterError::FailToConnect);
    }
    Ok(Settings {
        version: VersionReq::parse("=16.4.0")
            .map_err(|_| FlusterError::FailToInstallDatabaseDeps)?,
        port: get_database_port(),
        data_dir: dpath.unwrap(),
        ..Default::default()
    })
}

pub async fn get_database() -> Arc<Mutex<PostgreSQL>> {
    DB.get_or_init(|| async {
        let db_settings = get_database_settings();
        if db_settings.is_err() {
            log::error!("Could not connect to the database. We cannot continue.");
            std::process::exit(1);
        }
        let pg = PostgreSQL::new(db_settings.unwrap());
        Arc::new(Mutex::new(pg))
    })
    .await
    .clone()
}
