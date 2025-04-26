pub use fluster_rust_types::file_system_errors::FileSystemError;
use ignore::WalkBuilder;

#[flutter_rust_bridge::frb(sync)]
pub fn path_exists(file_path: &str) -> bool {
    std::fs::exists(file_path).is_ok_and(|a| a)
}

#[flutter_rust_bridge::frb(sync)]
pub fn get_app_config_dir(
) -> Result<String, fluster_rust_types::file_system_errors::FileSystemError> {
    let dir = dirs::config_dir().or(dirs::config_local_dir());
    if (dir.is_some()) {
        return Ok(dir.unwrap().join("fluster").to_str().unwrap().to_owned());
    }
    Err(fluster_rust_types::file_system_errors::FileSystemError::DataDirNotFound())
}

#[flutter_rust_bridge::frb(sync)]
pub fn get_app_data_dir() -> Result<String, fluster_rust_types::file_system_errors::FileSystemError>
{
    let dir = dirs::data_dir().or(dirs::data_local_dir());
    if (dir.is_some()) {
        return Ok(dir.unwrap().join("fluster").to_str().unwrap().to_owned());
    }
    Err(fluster_rust_types::file_system_errors::FileSystemError::DataDirNotFound())
}

// #[flutter_rust_bridge::frb()]
// pub fn walk_parsable_file_paths(dir_name: &str, ignore_file: &Option<String>) -> Vec<String> {
//     let mut paths = Vec::new();
//     let mut w = WalkBuilder::new(dir_name);
//     if (ignore_file.is_some()) {
//         w = w.add_custom_ignore_filename(ignore_file)
//     }
//     for result in w.build() {
//         if let Ok(valid_path) = result {
//             println!("Valid path: {:?}", valid_path);
//         } else {
//             println!("Invalid path: {:?}", result);
//         }
//     }
//     // for k in p.build() {
//     //     if (k.is_ok() && !(&k.unwrap().into_path().is_dir())) {
//     //         let s = k
//     //             .unwrap()
//     //             .into_path()
//     //             .into_os_string()
//     //             .into_string()
//     //             .unwrap();
//     //         paths.push(s);
//     //     }
//     // }
//     return paths;
// }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn path_exists_valid() {
        assert!(!path_exists("some/invalid/path/here"));
        assert!(path_exists("/Users/bigsexy/Desktop/fluster/cargo.toml"),);
    }

    // #[test]
    // fn finds_file_paths() {
    //     let paths = walk_parsable_file_paths("/Users/bigsexy/Desktop/notes/content", None());
    //     assert!(paths.len() > 0, "Found parsable paths");
    // }
}
