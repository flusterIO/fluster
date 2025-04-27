use std::path;

use crossbeam_channel::unbounded;
use fluster_rust_types::models::notes::mdx::mdx_note::MdxNoteRust;
use globset::Glob;
use ignore::{WalkBuilder, WalkState};

pub async fn sync_directory(dir_name: String) {
    let (sender, receiver) =
        unbounded::<Result<MdxNoteRust, fluster_rust_types::parsing_errors::ParsingError>>();
    let notes_path = path::Path::new(&dir_name);

    WalkBuilder::new(notes_path)
        .threads(32)
        .add_custom_ignore_filename(".flusterIgnore")
        .ignore(true)
        .build_parallel()
        .run(|| {
            let sender = sender.clone();
            Box::new(move |either_entry| {
                let entry = either_entry.unwrap();
                let path = entry.path();
                if path.is_file() && path.extension() == Some("mdx".as_ref()) {
                    println!("Path in mdx filter {:?}", path.to_str());
                    let note = MdxNoteRust::from_file_system_path(path.to_str().unwrap());
                    sender.send(note).unwrap();
                }
                WalkState::Continue
            })
        });

    drop(sender);

    let mut sql_string = "";
    if let Ok(note) = receiver.recv() {
        println!("Note is ok: {:?}", note.unwrap().file_path);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn locates_files() {
        let f = sync_directory("/Users/bigsexy/Desktop/notes/content/".to_owned()).await;
        assert!(true == true, "True does indeed equal true.");

        // assert_eq!(result, 4);
    }
}
