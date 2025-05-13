use fluster_types::errors::errors::FlusterError;

#[flutter_rust_bridge::frb(sync)]
pub fn path_exists(file_path: &str) -> bool {
    std::fs::exists(file_path).is_ok_and(|a| a)
}

#[flutter_rust_bridge::frb(sync)]
pub fn get_app_config_dir() -> Result<String, FlusterError> {
    let dir = dirs::config_dir().or(dirs::config_local_dir());
    if (dir.is_some()) {
        return Ok(dir.unwrap().join("fluster").to_str().unwrap().to_owned());
    }
    Err(FlusterError::DataDirNotFound())
}

#[flutter_rust_bridge::frb(sync)]
pub fn get_app_data_dir() -> Result<String, FlusterError> {
    let dir = dirs::data_dir().or(dirs::data_local_dir());
    if (dir.is_some()) {
        return Ok(dir.unwrap().join("fluster").to_str().unwrap().to_owned());
    }
    Err(FlusterError::DataDirNotFound())
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
