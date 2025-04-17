#[flutter_rust_bridge::frb(sync)]
pub fn path_exists(file_path: &str) -> bool {
    std::fs::exists(file_path).is_ok_and(|a| a)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn path_exists_valid() {
        assert!(!path_exists("some/invalid/path/here"));
        assert!(path_exists("/Users/bigsexy/Desktop/fluster/cargo.toml"),);
    }
}
