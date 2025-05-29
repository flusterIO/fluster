use crate::core::{db::db::get_database_uri, events::set_db_connection_uri::SetDbConnectionUri};
use log::{error, info};
use sqlx::postgres::PgPoolOptions;
use tauri::{AppHandle, Emitter, Runtime};

use super::db::{get_database, get_database_path};

pub async fn initialize_database<T: Runtime>(app: &AppHandle<T>) {
    let uri = get_database_uri();
    if let Some(db_path) = get_database_path() {
        let exists = std::fs::exists(&db_path).is_ok_and(|x| x);
        if !exists {
            let mkdir_res = std::fs::create_dir_all(&db_path);
            if mkdir_res.is_err() {
                error!("Creating the fluster managed database was unsuccessful.");
                println!("Creating the fluster managed database was unsuccessful.");
            }
        }
        let db_res = get_database().await;
        let mut db = db_res.lock().await;

        let db_exists = db.database_exists("fluster").await.is_ok_and(|x| x);
        if !exists || !db_exists {
            // This is only setup once when the application is initially launched.
            info!("Initializing database...");
            let setup_res = db.setup().await;
            if setup_res.is_err() {
                print!("Error in db.setup - {:?}", setup_res.err());
                error!("An error occurred while attempting to initialize Fluster's database.");
                println!("An error occurred while attempting to initialize Fluster's database.");
            }
            // FIXME: Reenable this pg-vector install. It's currently running into a 401 error since I'm working on public networks all day.
            // info!("Installing vector related database dependencies...");
            // let pg_vector_install_res = postgresql_extensions::install(
            //     db.settings(),
            //     "portal-corp",
            //     "pgvector_compiled",
            //     &VersionReq::parse("=0.16.12")
            //         .expect("Failed to parse version provided to pg-vector."),
            // )
            // .await;
            // if pg_vector_install_res.is_err() {
            //     println!(
            //         "Error while installing pg-vector: {:?}",
            //         pg_vector_install_res.err()
            //     );
            // }
            let start_res = db.start().await;
            if start_res.is_err() {
                println!("Error when starting database: {:?}", start_res.err());
            }

            // Database needs to be created before the pool is created to avoid a 'database not
            // found' error.
            let create_res = db.create_database("fluster").await;
            if create_res.is_err() {
                log::error!("Failed to create the fluster database.");
                println!("Failed to create the fluster database.");
            }
            let pool_res = PgPoolOptions::new().max_connections(5).connect(&uri).await;
            if pool_res.is_ok() {
                let pool = pool_res.unwrap();
                let res = sqlx::migrate!("./migrations").run(&pool).await;
                if res.is_err() {
                    println!("Error here: {:?}", res.err());
                    log::error!("Failed to initialize database.");
                    println!("Failed to initialize database.");
                } else {
                    log::info!("Successfully initialized database.");
                    println!("Creating Fluster database...");
                    let stop_res = db.stop().await;
                    if stop_res.is_err() {
                        println!("Error when stopping database: {:?}", stop_res.err())
                    }
                    pool.close().await;
                }
            } else {
                log::error!("Failed to initialize database.");
                println!("Failed to initialize database.");
                println!("Error down here: {:?}", pool_res.err());
            }
        }
    } else {
        // TODO: Send an event to the front end here.
        // on_error.send(FlusterError::FailToConnect);
        log::error!("Failed to establish a local database connection. If you are using a common operating system and still encounter this error, please file an issue on Github.");
    }
    let res = app.emit("set-db-uri", SetDbConnectionUri { uri });
    if res.is_err() {
        log::error!("An error occurred while emitting the SetDbConnectionUri event.");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn initializes_database() {
        let app = tauri::test::mock_app();
        let handle = app.handle();
        initialize_database(handle).await;
    }
}
