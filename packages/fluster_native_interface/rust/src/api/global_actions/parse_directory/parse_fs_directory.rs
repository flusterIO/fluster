use std::{path, str};

use crossbeam_channel::unbounded;
use fluster_rust_types::models::notes::mdx::mdx_note::MdxNoteRust;
use globset::{Glob, GlobMatcher};
use ignore::{types::Types, DirEntry, WalkBuilder, WalkState};
use slicestring::Slice;

pub fn format_path(p: String) -> String {
    let mut s = p;
    if s.starts_with("/") {
        // str::split
        // s = s.chars().n
    }
    // if s.ends_with("/") {
    //     s = s.slice_unchecked(0, s.len() - 2).to_string();
    // }
    s.to_string()
}

/// Glob matches all parsable files.
// ?.compile_matcher()

pub async fn sync_directory(dir_name: String) {
    let parsable_glob = Glob::new("**/*.mdx").unwrap().compile_matcher();
    println!("Directory path in Rust: {:?}", dir_name);
    let (sender, receiver) =
        unbounded::<Result<MdxNoteRust, fluster_rust_types::parsing_errors::ParsingError>>();
    let notes_path = path::Path::new(&dir_name);

    // println!("Glob: {:?}", glob_path);

    WalkBuilder::new(notes_path)
        .threads(32)
        .add_custom_ignore_filename(".flusterIgnore")
        .ignore(true)
        .build_parallel()
        .run(|| {
            let sender = sender.clone();
            Box::new(move |either_entry| {
                // TODO: Handler errors
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
    // for note in receiver {
    //     if (note.is_ok()) {
    //         println!("Note is ok: {:?}", note.unwrap().file_path);
    //     } else {
    //         println!("Are any of us really Ok?: {:?}", note.unwrap().file_path);
    //     }
    // }
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
