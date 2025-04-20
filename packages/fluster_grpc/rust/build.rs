use std::{env, path::PathBuf};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let output_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    println!("Building protobuf definitions in {:?}", output_dir);
    tonic_build::configure()
        .file_descriptor_set_path(output_dir.join("fluster_descriptor.bin"))
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
            &["src/proto"], // &[root
                            //     .join("packages")
                            //     .join("fluster_grpc")
                            //     .join("rust")
                            //     .join("src")
                            //     .join("proto")],
        )?;
    Ok(())
}
