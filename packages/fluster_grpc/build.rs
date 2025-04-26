use std::{env, path};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let r = env::var("FLUSTER_NATIVE_ROOT");
    if (r.is_err()) {
        println!("Cannot continue with build without the FLUSTER_NATIVE_ROOT env variable.");
    }
    let root_path = path::Path::new(&r.unwrap())
        .join("packages")
        .join("fluster_grpc")
        .join("rust")
        .join("src")
        .join("proto");
    tonic_build::compile_protos(root_path.join("mdx.proto"))?;
    tonic_build::compile_protos(root_path.join("database.proto"))?;
    tonic_build::compile_protos(root_path.join("settings.proto"))?;
    // tonic_build::compile_protos("src/proto/database.proto")?;
    // tonic_build::compile_protos("src/proto/settings.proto")?;
    Ok(())
}
