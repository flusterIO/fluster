use std::{env, path};

use lib_flutter_rust_bridge_codegen::codegen;
use lib_flutter_rust_bridge_codegen::codegen::Config;
use lib_flutter_rust_bridge_codegen::utils::logs::configure_opinionated_logging;

fn main() -> Result<(), ()> {
    let r = env::var("FLUSTER_NATIVE_ROOT");
    if r.is_err() {
        println!("Cannot continue with build without the FLUSTER_NATIVE_ROOT env variable.");
    }
    let root_path = path::Path::new(&r.unwrap())
        .join("packages")
        .join("fluster_native_interface");
    // Uncomment the line below, if you only want to generate bindings on api directory change.
    //
    // NOTE: This accelerates the build process, but you will need to manually trigger binding
    // generation whenever there are changes to definitions outside of the api directory that it
    // depends on.
    //
    // println!("cargo:rerun-if-changed=src/api");

    // If you want to see logs
    // Alternatively, use `cargo build -vvv` (instead of `cargo build`) to see logs on screen
    let log_res = configure_opinionated_logging(root_path.join("logs").to_str().unwrap(), true);
    if log_res.is_err() {
        return Err(());
    }
    let config =
        Config::from_config_file(root_path.join("flutter_rust_bridge.yaml").to_str().unwrap());

    if config.is_err() {
        return Err(());
    }

    // Execute code generator with auto-detected config
    let res = codegen::generate(config.unwrap().unwrap(), Default::default());
    if res.is_err() {
        return Err(());
    }
    Ok(())
}
