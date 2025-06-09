use crate::core::types::errors::errors::FlusterError;

use super::{
    models::sync_filesystem_options::SyncFilesystemDirectoryOptions,
    sync_methods::{
        sync_bibliography::sync_bibliography, sync_mdx_notes::sync_mdx_filesystem_notes,
    },
};

// use super::sync_methods::sync_mdx_notes::sync_mdx_filesystem_notes;

pub async fn sync_directory(opts: SyncFilesystemDirectoryOptions) -> Result<(), FlusterError> {
    sync_mdx_filesystem_notes(&opts).await?;

    if opts.bib_path.is_some() {
        sync_bibliography(&opts.bib_path.unwrap()).await?;
    }
    Ok(())
}

// TODO: Turn this back on when you figure out how to create an `AppHandle` instance in the test.
#[cfg(test)]
mod tests {
    use super::*;
    #[tokio::test]
    async fn sync_returns_no_errors() {
        let opts = SyncFilesystemDirectoryOptions {
            dir_path: "/Users/bigsexy/Desktop/notes/content/".to_string(),
            ..Default::default()
        };
        println!("Opts {:?}", opts);
        let res = sync_directory(opts).await;
        assert!(res.is_ok(), "Syncs directory without throwingg an error.");
        // let db_res = get_database().await;
        // let handle = App::
        // assert!(f.is_none_or(|x| x.is_empty()), "Is not none or empty.");
        // assert_eq!(result, 4);
    }
}
