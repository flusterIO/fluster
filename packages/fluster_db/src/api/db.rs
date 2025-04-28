use fluster_types::typedefs::note_type_utils::FlusterDb;
use std::path::PathBuf;
use surrealdb::{engine::local::RocksDb, opt::auth::Root};

pub fn get_database_path() -> Option<PathBuf> {
    let mut d = dirs::data_dir();
    if d.is_none() {
        d = dirs::data_local_dir();
    }
    if d.is_none() {
        log::error!("Failed to get a databse path for your operating system. Something is likely configured terribly wrong.");
        return None;
    }
    d
}

pub struct DatabaseOptions<'a> {
    pub database_name: String,
    pub port: String,
    pub credentials: Root<'a>,
}

impl Default for DatabaseOptions<'_> {
    fn default() -> Self {
        Self {
            database_name: Default::default(),
            port: "8000".to_string(),
            credentials: Root {
                username: "root",
                password: "root",
            },
        }
    }
}

/// This should be used as the only way to read get access to the database. This desperately need
/// to be set to a constructor, but it's early, I'm tired, I'm new to rust, and rust is hard...
pub async fn get_database(
) -> Result<FlusterDb, fluster_types::errors::database_errors::DatabaseError> {
    let d = get_database_path();
    if d.is_none() {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let e =
        surrealdb::Surreal::new::<RocksDb>(format!("rocksdb://{}", d.unwrap().to_str().unwrap()))
            .await;
    if e.is_err() {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let x = e.unwrap().to_owned();
    Ok(x)
}

// pub async fn get_database(
//     opts: DatabaseOptions<'_>,
// ) -> Result<&LazyLock<Surreal<Client>>, fluster_types::errors::database_errors::DatabaseError> {
//     let e = DB.connect::<Ws>(format!("rocksdb://{}", opts.port)).await;
//     if e.is_err() {
//         return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
//     }
//     let res = DB.signin(opts.credentials).await;
//     if res.is_err() {
//         return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
//     }
//     let res2 = DB.use_ns("fluster").use_db(opts.database_name).await;
//     if res2.is_err() {
//         return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
//     }
//     Ok(&DB)
// }

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn database_returns_healthy_report() {
        let db = get_database().await;
        assert!(db.is_ok(), "Database does not return an error.");
        // assert_eq!(result, 4);
    }
}
