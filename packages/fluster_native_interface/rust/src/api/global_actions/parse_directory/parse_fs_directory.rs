use crossbeam_channel::unbounded;
use fluster_rust_types::models::notes::mdx::mdx_note::MdxNoteRust;
use ignore::{WalkBuilder, WalkState};

pub async fn sync_directory(dir_name: String) {
    println!("Directory path in Rust: {:?}", dir_name);
    let (sender, receiver) =
        unbounded::<Result<MdxNoteRust, fluster_rust_types::parsing_errors::ParsingError>>();
    // let p = path::Path::new(&dir_name);
    // let database_thread = std::thread::spawn(move || {
    // });

    WalkBuilder::new(&dir_name)
        .add_custom_ignore_filename(".flusterIgnore")
        .build_parallel()
        .run(|| {
            let sender = sender.clone();
            Box::new(move |either_entry| {
                // TODO: Handler errors
                let entry = either_entry.unwrap();
                let path = entry.path();
                if path.is_file() && path.extension() == Some(".mdx".as_ref()) {
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
        // assert_eq!(result, 4);
    }
}
