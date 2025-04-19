fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("src/proto/mdx.proto")?;
    tonic_build::compile_protos("src/proto/database.proto")?;
    tonic_build::compile_protos("src/proto/settings.proto")?;
    Ok(())
}
