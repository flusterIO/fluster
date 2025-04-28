pub fn setup_file_system_for_data(
) -> Option<fluster_types::errors::file_system_errors::FileSystemError> {
    let data_dir = dirs::data_dir().or(dirs::data_local_dir());
    if let Some(dir_name) = data_dir {
        let res = std::fs::create_dir_all(dir_name.join("Fluster").join("data").join("database"));
        if res.is_err() {
            Some(fluster_types::errors::file_system_errors::FileSystemError::FailToCreatePath)
        } else {
            None
        }
    } else {
        Some(fluster_types::errors::file_system_errors::FileSystemError::DataDirNotFound())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sets_up_file_system_properly() {
        let res = setup_file_system_for_data();
        assert!(res.is_none(), "Setup file system without errors");
        // assert_eq!(result, 4);
    }
}
