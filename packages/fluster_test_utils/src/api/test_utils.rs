use std::{env, path, process::exit};

use surrealdb::{
    engine::local::{Db, Mem},
    Surreal,
};

pub fn get_development_root_or_die() -> String {
    let r = env::var("FLUSTER_NATIVE_ROOT");
    if r.is_err() {
        println!("Failed to get the FLUSTER_NATIVE_ROOT environment variable. Cannot continue.");
        exit(1)
    }
    r.unwrap().to_owned()
}

pub fn get_test_mdx_path() -> std::path::PathBuf {
    let root = get_development_root_or_die();
    path::Path::new(&root)
        .join("packages")
        .join("fluster_test_utils")
        .join("src")
        .join("test_content")
        .join("test_mdx_content.mdx")
}

// pub async fn get_memory_database() -> Surreal<Db> {
//     let db = Surreal::new::<Mem>(())
//         .await
//         .expect("Returns in memory database for testing without throwing an error.");
//     db.use_ns("fluster").use_db("main");
//     db
// }
