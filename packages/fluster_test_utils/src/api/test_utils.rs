use std::{env, process::exit};

pub fn get_development_root_or_die() -> String {
    let r = env::var("FLUSTER_NATIVE_ROOT");
    if r.is_err() {
        println!("Failed to get the FLUSTER_NATIVE_ROOT environment variable. Cannot continue.");
        exit(1)
    }
    r.unwrap().to_owned()
}
