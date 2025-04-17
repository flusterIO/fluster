#[derive(Debug, thiserror::Error)]
pub enum NativeInterfaceError {
    #[error("Fluster failed to locate a valid locate to store the necessary data. Please submit an issue on {}", crate::api::constants::constants::GITHUB_ISSUE_PAGE_URL)]
    FailToLocateStorageDir,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn error_formats_string() {
        let e = NativeInterfaceError::FailToLocateStorageDir;
        println!("{}", e);
        // assert!(e)
        // assert_eq!(result, 4);
    }
}
