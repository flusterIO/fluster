#[flutter_rust_bridge::frb()]
pub async fn sync_directory(dir_path: &str) {
    println!("Directory path in Rust: {:?}", dir_path);
}
