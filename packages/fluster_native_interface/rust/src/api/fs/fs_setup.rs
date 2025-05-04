use std::{env::temp_dir, path::PathBuf};

use fluster_types::errors::errors::FlusterError;

fn make_dir_or_fail_to_create(p: PathBuf) -> Option<FlusterError> {
    if !p.exists() {
        let dir_err = std::fs::create_dir_all(p);
        if dir_err.is_err() {
            Some(FlusterError::FailToCreatePath)
        } else {
            None
        }
    } else {
        None
    }
}

pub fn setup_file_system_for_data() -> Option<FlusterError> {
    let data_dir = dirs::data_dir().or(dirs::data_local_dir());
    if let Some(dir_name) = data_dir {
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("data").join("database"))?;
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("logs"))?;
        make_dir_or_fail_to_create(dir_name.join("Fluster").join("tmp"))?;
        None
    } else {
        Some(FlusterError::DataDirNotFound())
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
