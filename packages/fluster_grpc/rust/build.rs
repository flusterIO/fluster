use std::{env, path};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let r = &env::var("FLUSTER_NATIVE_ROOT").unwrap();
    let root = path::Path::new(r);
    // tonic_build::compile_protos("src/proto/mdx.proto")?;
    // tonic_build::compile_protos("src/proto/database.proto")?;
    // tonic_build::compile_protos("src/proto/settings.proto")?;
    // tonic_build::compile_protos("src/proto/fluster.proto")?;
    let output_dir = root.join("target");
    // .join("fluster_grpc")
    // .join("rust")
    // .join("generated");
    println!("Building protobuf definitions in {:?}", output_dir);
    tonic_build::configure()
        // .build_server(false)
        .out_dir(output_dir)
        .message_attribute(
            "settings.v1",
            "#[derive(Debug, serde::Serialize, serde::Deserialize), frb(non_opaque)]",
        )
        .compile_protos(
            &[
                "fluster.proto",
                "mdx.proto",
                "settings.proto",
                "database.proto",
            ],
            &["src/proto"],
        )?;
    Ok(())
}
