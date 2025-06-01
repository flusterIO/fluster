pub use crossbeam_channel::Sender;

// pub async fn sync_user_bibliography(
//     bib_path: &str,
//     error_sender: &Sender<FlusterError>,
//     db: FlusterDb,
//     n_threads: u32,
// ) {
// }
// let bib_file = BibtexFile::from_filesystem_path(bib_path).await;
// if bib_file.is_ok() {
// bib_file.unwrap().save_entries(db).await;
// let js_files = EmbededJsFiles::get("sync_bibliography/sync_bibliography.cjs")
//     .expect("Did not find embedded javascript file.");
// let js_code = std::str::from_utf8(js_files.data.as_ref()).expect(
//     "Could not parse javascript file content in sync_bibliography/sync_bibliography.cjs.",
// );
// let res = fluster_v8::get_v8_environment::run_javascript_min(js_code, n_threads);
// } else {
//     error_sender.send(FlusterError::CannotParseBibfile);
// }
// }

// #[cfg(test)]
// mod tests {
//     use crossbeam_channel::unbounded;

//     use crate::core::db::db::{get_database_connection, get_surreal};

//     use super::*;

//     #[tokio::test]
//     async fn sync_bib_throw_no_errors() {
//         let (error_sender, error_receiver) = unbounded::<FlusterError>();
//         let d = get_surreal()
//             .await
//             .expect("Returned the database without throwing an error.");
//         let db = get_database_connection(d)
//             .await
//             .expect("Retrieved database without errors.");
//         let x = sync_user_bibliography(
//             "/Users/bigsexy/Desktop/notes/content/citations.bib",
//             &error_sender,
//             &db,
//             8,
//         );
//         for k in error_receiver.iter() {
//             assert!(false, "Sync bib returned no errors for a valid path.")
//         }
//         // assert_eq!(result, 4);
//     }
// }
