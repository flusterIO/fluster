use diesel_async::RunQueryDsl;
use fluster_types::errors::errors::FlusterError;

use crate::{
    api::db::get_database_connection, entities::mdx_note::mdx_note_creatable::MdxNoteCreatable,
};

pub async fn create_many_mdx_notes(new_notes: Vec<MdxNoteCreatable>) -> Option<Vec<FlusterError>> {
    use crate::api::schema::generated::main_schema::mdx_note::dsl::*;
    let mut errors: Vec<FlusterError> = Vec::new();
    if let Ok(mut c) = get_database_connection().await {
        for new_note in new_notes {
            let res = diesel::insert_into(mdx_note)
                .values(&new_note)
                .execute(&mut c)
                .await;
            if res.is_err() {
                let p = match new_note.file_path {
                    // The string needs to be formatted like this every time it is passed into this
                    // specific error to format the message properly.
                    Some(x) => format!(" at {}", x),
                    None => "".to_string(),
                };
                errors.push(FlusterError::FailToSaveMdxNote(p));
            }
        }
    } else {
        errors.push(FlusterError::FailToConnect);
    }
    if errors.is_empty() {
        None
    } else {
        Some(errors)
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[tokio::test]
    async fn create_many_mdx_note_saves_successfully() {
        let t = chrono::NaiveDateTime::from_timestamp(0, 0);
        let mut notes: Vec<MdxNoteCreatable> = Vec::new();
        let note = MdxNoteCreatable {
            id: None,
            raw_body: "This is a test from create_many_mdx_note_saves_successfully.".to_string(),
            file_path: Some("/some/fake/path".to_string()),
            ctime: t,
            atime: t,
            mtime: t,
        };
        notes.push(note);
        let res = create_many_mdx_notes(notes).await;
        assert!(
            res.is_none(),
            "Database saves mdx note without throwing an error."
        );
    }
}
