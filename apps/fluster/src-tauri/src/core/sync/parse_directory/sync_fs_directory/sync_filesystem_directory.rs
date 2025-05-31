use crossbeam_channel::unbounded;
use tauri::ipc::Channel;

use crate::core::{database::db::get_database, types::errors::errors::FlusterError};

use super::models::sync_filesystem_options::SyncFilesystemDirectoryOptions;

// use super::sync_methods::sync_mdx_notes::sync_mdx_filesystem_notes;

pub async fn sync_directory(
    app: &tauri::AppHandle,
    opts: SyncFilesystemDirectoryOptions,
    on_error: Channel<FlusterError>,
) -> Result<(), FlusterError> {
    let (error_sender, error_receiver) = unbounded::<FlusterError>();

    let db_res = get_database().await;
    let mut db = db_res.lock().await;

    // This needs to go before joining threads, but after all of the thread initialization
    for err in error_receiver.iter() {
        on_error.send(err);
    }

    // No need to thread here, as ignore is taking care of the threading.
    // sync_mdx_filesystem_notes(&opts.dir_path, &error_sender, &mut db).await?;

    // Check if user provided bib path, and if so spawn a new thread and sync that bib.
    // let handle: Option<>
    // let bib_thread_handle = std::thread::spawn(async move || {
    //     if opts.bib_path.is_some() {
    //         sync_user_bibliography(
    //             &opts.bib_path.unwrap(),
    //             &bib_error_sender,
    //             &conn,
    //             max(n_threads - 1, 1),
    //         )
    //         .await;
    //     }
    // });
    // bib_thread_handle.join();
    Ok(())
}

// TODO: Turn this back on when you figure out how to create an `AppHandle` instance in the test.
#[cfg(test)]
mod tests {
    use super::*;
    use tauri::{App, AppHandle};
    #[tokio::test]
    async fn sync_returns_no_errors() {
        let db = get_database().await;
        // let handle = App::
        // assert!(f.is_none_or(|x| x.is_empty()), "Is not none or empty.");
        // assert_eq!(result, 4);
    }
}
