pub use fluster_types::errors::errors::FlusterError;
use fluster_types::FlusterDb;
use std::path::PathBuf;
use surrealdb::{
    engine::local::{Db, RocksDb},
    opt::auth::Root,
    Surreal,
};
use tokio::sync::OnceCell;

use super::utils::get_database_path;

// static DB: LazyLock<Surreal<Db>> = LazyLock::new(Surreal::init);
static DB: OnceCell<Surreal<Db>> = OnceCell::const_new();

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
pub async fn get_database() -> Result<&'static FlusterDb, FlusterError> {
    let db = DB
        .get_or_init(|| async {
            let d = get_database_path().unwrap();
            let res = surrealdb::Surreal::new::<RocksDb>(d.to_str().unwrap()).await;
            if res.is_err() {
                println!("Instanciating surrealdb returned an error. {:?}", res);
            }
            res.unwrap()
        })
        .await;
    Ok(db)
}

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
