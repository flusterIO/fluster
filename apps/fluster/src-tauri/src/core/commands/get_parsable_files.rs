use std::ffi::OsStr;

use crate::core::types::errors::errors::FlusterResult;
use crossbeam_channel::unbounded;
use ignore::{DirEntry, WalkBuilder, WalkState};
use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Serialize, Deserialize, Type, Default)]
pub struct ParsableFiles {
    pub mdx_files: Vec<String>,
    pub csv_files: Vec<String>,
}

#[derive(Type, Serialize, Deserialize)]
pub struct GetParsableFilesOptions {
    /// The path to the user's note's directory
    pub dir_path: String,
    /// The stringified integer representing the number of threads.
    pub n_threads: String,
    pub use_git_ignore: bool,
}

#[tauri::command]
#[specta::specta]
pub async fn get_parsable_files(opts: GetParsableFilesOptions) -> FlusterResult<ParsableFiles> {
    let threads: usize = opts.n_threads.parse().unwrap();
    let (mdx_sender, mdx_receiver) = unbounded::<String>();
    let (csv_sender, csv_receiver) = unbounded::<String>();
    WalkBuilder::new(opts.dir_path.clone())
        .threads(threads)
        .add_custom_ignore_filename(".flusterIgnore")
        .git_ignore(opts.use_git_ignore)
        .ignore(true)
        .build_parallel()
        .run(|| {
            let mdx_sender = mdx_sender.clone();
            let csv_sender = csv_sender.clone();
            Box::new(move |either_entry: Result<DirEntry, ignore::Error>| {
                if either_entry.is_ok() {
                    // This unecessary 'if let' statement was the only way I could resolve a
                    // type issue while off wifi and unable to look at the docs. Remove this
                    // when you have time and an internet connection.
                    let x = either_entry.unwrap().clone();
                    let path = x.path();
                    let path_extension = path.extension().unwrap_or("--".as_ref());
                    let fps: Vec<&OsStr> = vec!["md".as_ref(), "mdx".as_ref()];
                    let is_markdown = fps.contains(&path_extension);
                    if path.is_file() {
                        if is_markdown {
                            mdx_sender.send(path.to_str().unwrap().to_string()).unwrap();
                        } else if path_extension == "csv" {
                            csv_sender.send(path.to_str().unwrap().to_string()).unwrap();
                        }
                    }
                }
                WalkState::Continue
            })
        });

    drop(mdx_sender);
    drop(csv_sender);
    let mut data = ParsableFiles::default();

    for file_path in mdx_receiver.iter() {
        data.mdx_files.push(file_path.clone())
    }

    for file_path in csv_receiver.iter() {
        data.csv_files.push(file_path.clone())
    }

    Ok(data)
}
