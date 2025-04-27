use std::{path::PathBuf, process::exit, sync::LazyLock};
use surrealdb::{
    engine::{
        local::RocksDb,
        remote::ws::{Client, Ws},
    },
    opt::auth::Root,
    Connect, Surreal,
};
use validator::ValidateRequired;

pub fn get_database_path() -> Option<PathBuf> {
    let mut d = dirs::data_dir();
    if (d.is_none()) {
        d = dirs::data_local_dir();
    }
    if d.is_none() {
        log::error!("Failed to get a databse path for your operating system. Something is likely configured terribly wrong.");
        return None;
    }
    d
}

/// App wide database singleton. Must always be accessed through the get_database method to ensure
/// relevant properties are set prior to each request.
static DB: LazyLock<surrealdb::Surreal<surrealdb::engine::remote::ws::Client>> =
    std::sync::LazyLock::new(Surreal::init);

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

type DatabaseType = Surreal<surrealdb::engine::local::Db>;

type DatabaseConnection =
    Connect<surrealdb::engine::local::Db, Surreal<surrealdb::engine::local::Db>>;

pub async fn get_other_db(
) -> Result<DatabaseType, fluster_types::errors::database_errors::DatabaseError> {
    let d = get_database_path();
    if (d.is_some()) {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let e =
        surrealdb::Surreal::new::<RocksDb>(format!("rocksdb://{}", d.unwrap().to_str().unwrap()))
            .await;
    if (e.is_err()) {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let x = e.unwrap().to_owned();
    Ok(x)
}

pub async fn get_database(
    opts: DatabaseOptions<'_>,
) -> Result<&LazyLock<Surreal<Client>>, fluster_types::errors::database_errors::DatabaseError> {
    let e = DB.connect::<Ws>(format!("rocksdb://{}", opts.port)).await;
    if e.is_err() {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let res = DB.signin(opts.credentials).await;
    if res.is_err() {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    let res2 = DB.use_ns("fluster").use_db(opts.database_name).await;
    if res2.is_err() {
        return Err(fluster_types::errors::database_errors::DatabaseError::FailToConnect);
    }
    Ok(&DB)
}
