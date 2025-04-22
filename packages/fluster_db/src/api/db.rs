use std::sync::LazyLock;
use surrealdb::{
    engine::remote::ws::{Client, Ws},
    opt::auth::Root,
    Surreal,
};

/// App wide database singleton. Must always be accessed through the get_database method to ensure
/// relevant properties are set prior to each request.
static DB: LazyLock<surrealdb::Surreal<surrealdb::engine::remote::ws::Client>> =
    std::sync::LazyLock::new(Surreal::init);

pub struct DatabaseAuthCredentials {
    user_name: String,
    password: String,
}

pub struct DatabaseOptions<'a> {
    pub database_name: String,
    pub port: String,
    pub credentials: Root<'a>,
}

impl<'a> Default for DatabaseOptions<'a> {
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

pub async fn get_database(
    opts: DatabaseOptions<'_>,
) -> Result<&LazyLock<Surreal<Client>>, fluster_rust_types::database_errors::DatabaseError> {
    let e = DB.connect::<Ws>(format!("localhost:{}", opts.port)).await;
    if e.is_err() {
        return Err(fluster_rust_types::database_errors::DatabaseError::FailToConnect);
    }
    DB.signin(opts.credentials).await;
    DB.use_ns("fluster").use_db(opts.database_name).await;
    Ok(&DB)
}
