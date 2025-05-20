use crossbeam_channel::unbounded;
use tauri::ipc::Channel;

use crate::core::{
    db::db::{get_database_connection, get_pg_embed},
    sync::sync_local_database::SyncFilesystemDirectoryOptions,
    types::errors::errors::FlusterError,
};

use super::sync_methods::sync_mdx_notes::sync_mdx_filesystem_notes;

pub async fn sync_directory(
    app: &tauri::AppHandle,
    opts: SyncFilesystemDirectoryOptions,
    on_error: Channel<FlusterError>,
) -> Result<(), FlusterError> {
    let (error_sender, error_receiver) = unbounded::<FlusterError>();

    let mut db = get_pg_embed().await?;
    db.start_db().await;
    let mut conn = get_database_connection(&db).await?;

    // This needs to go before joining threads, but after all of the thread initialization
    for err in error_receiver.iter() {
        on_error.send(err);
    }

    // No need to thread here, as ignore is taking care of the threading.
    let res = sync_mdx_filesystem_notes(&opts.dir_path, &error_sender, &mut conn).await?;

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
    db.stop_db().await;
    Ok(())
}

// TODO: Turn this back on when you figure out how to create an `AppHandle` instance in the test.
// #[cfg(test)]
// mod tests {
//     use tauri::{App, AppHandle};
//     use super::*;
// #[tokio::test]
// async fn sync_returns_no_errors() {
//     let mut db = get_pg_embed().await.expect("Get's pg_embed without error.");
//     db.start_db().await;
//     let mut conn = get_database_connection()
//         .await
//         .expect("Returned database connection without throwing an error.");
//     let c: Channel<FlusterError> = Channel::new(|e| {
//         assert!(true, "Parses directory without throwing an error.");
//         Ok(())
//     });
//     let f = sync_directory(
//         SyncFilesystemDirectoryOptions {
//             dir_path: "/Users/bigsexy/Desktop/notes/content/".to_string(),
//             bib_path: None,
//             n_threads: 8,
//         },
//         c,
//     );
//     .await;
//     assert!(f.is_none_or(|x| x.is_empty()), "Is not none or empty.");
//     // assert_eq!(result, 4);
// }
// }
