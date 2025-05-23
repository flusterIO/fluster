use std::{path::PathBuf, time::Duration};

use crate::core::types::errors::errors::{FlusterError, FlusterResult};
use pg_embed::{
    pg_enums::PgAuthMethod,
    pg_fetch::{PgFetchSettings, PG_V15},
    postgres::{PgEmbed, PgSettings},
};
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::OnceCell;

static DB: OnceCell<Arc<Mutex<PgEmbed>>> = OnceCell::const_new();

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

pub fn get_database_settings() -> FlusterResult<PgSettings> {
    let dpath = get_database_path();
    if dpath.is_none() {
        return Err(FlusterError::FailToConnect);
    }
    Ok(PgSettings {
        // Where to store the postgresql database
        database_dir: dpath.unwrap(),
        port: 5432,
        user: "postgres".to_string(),
        password: "password".to_string(),
        // authentication method
        auth_method: PgAuthMethod::Plain,
        // If persistent is false clean up files and directories on drop, otherwise keep them
        persistent: false,
        // duration to wait before terminating process execution
        // pg_ctl start/stop and initdb timeout
        // if set to None the process will not be terminated
        timeout: Some(Duration::from_secs(15)),
        // If migration sql scripts need to be run, the directory containing those scripts can be
        // specified here with `Some(PathBuf(path_to_dir)), otherwise `None` to run no migrations.
        // To enable migrations view the **Usage** section for details
        migration_dir: None,
    })
}

pub fn get_database_fetch_settings() -> PgFetchSettings {
    PgFetchSettings {
        version: PG_V15,
        ..Default::default()
    }
}

pub async fn get_database() -> Arc<Mutex<PgEmbed>> {
    DB.get_or_init(|| async {
        let db_settings = get_database_settings();
        if db_settings.is_err() {
            log::error!("Could not connect to the database. We cannot continue.");
            std::process::exit(1);
        }
        let pg = PgEmbed::new(db_settings.unwrap(), get_database_fetch_settings()).await;
        if pg.is_err() {
            log::error!("Could not connect to the database. We cannot continue.");
            std::process::exit(1);
        }
        Arc::new(Mutex::new(pg.unwrap()))
    })
    .await
    .clone()
}

