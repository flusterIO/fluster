use fluster_db::api::{db::get_database, utils::get_database_path};

#[derive(PartialEq, Eq)]
pub enum FlusterDatabaseStatus {
    /// NotInitialized is true when the database directory doesn't exist.
    NotInitialized,
    ///  There's an error with the database that needs to be handled elsewhere.
    ErrorEncountered,
    /// Not connected is reserved for use in future remote database support.
    NotConnected,
    /// Connected: Everything's honkey-dorey.
    Connected,
    /// The state when the app initially starts, before the database status is returned from
    /// the async function.
    AwaitingInitialPing,
}

pub async fn get_database_status() -> FlusterDatabaseStatus {
    let db_path = get_database_path();
    if db_path.is_none() {
        return FlusterDatabaseStatus::NotInitialized;
    }
    let p = db_path.as_ref().unwrap();
    let exists = std::fs::exists(p.to_str().unwrap());
    if !exists.is_ok_and(|x| x) {
        return FlusterDatabaseStatus::NotInitialized;
    }
    let db_health = get_database().await;
    if db_health.is_err() {
        return FlusterDatabaseStatus::ErrorEncountered;
    }
    FlusterDatabaseStatus::Connected
}
