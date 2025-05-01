use std::{env::temp_dir, path::PathBuf};

pub use fluster_types::errors::file_system_errors::FileSystemError;

fn make_dir_or_fail_to_create(p: PathBuf) -> Option<FileSystemError> {
    if !p.exists() {
        let dir_err = std::fs::create_dir_all(p);
        if dir_err.is_err() {
            Some(FileSystemError::FailToCreatePath)
        } else {
            None
        }
    } else {
        None
    }
}

pub fn setup_file_system_for_data() -> Option<FileSystemError> {
    let data_dir = dirs::data_dir().or(dirs::data_local_dir());
    if let Some(dir_name) = data_dir {
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("data").join("database"))?;
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("logs"))?;
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("tmp"))?;
        None
    } else {
        Some(FileSystemError::DataDirNotFound())
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
