use diesel_async::{AsyncPgConnection, RunQueryDsl};
use fluster_db::entities::mdx_note::mdx_note_creatable::MdxNoteCreatable;
use fluster_types::errors::errors::FlusterError;

/// flutter_rust_bridge:ignore
pub async fn create_many_mdx_notes(
    c: &mut AsyncPgConnection,
    new_notes: Vec<MdxNoteCreatable>,
) -> Option<Vec<FlusterError>> {
    use fluster_db::generated::main_schema::mdx_note::dsl::*;
    let mut errors: Vec<FlusterError> = Vec::new();
    for new_note in new_notes {
        let res = diesel::insert_into(mdx_note)
            .values(&new_note)
            .execute(c)
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
    if errors.is_empty() {
        None
    } else {
        Some(errors)
    }
}

#[cfg(test)]
mod tests {

    use crate::api::data_interface::database::db::get_database_connection;

    use super::*;
    #[tokio::test]
    async fn create_many_mdx_note_saves_successfully() {
        let t = chrono::NaiveDateTime::from_timestamp(0, 0);
        let mut c = get_database_connection()
            .await
            .expect("Returned the datbase connection without throwing an error.");
        let mut notes: Vec<MdxNoteCreatable> = Vec::new();
        let note = MdxNoteCreatable {
            id: None,
            raw_body: "This is a test from create_many_mdx_note_saves_successfully.".to_string(),
            file_path: Some("/some/fake/path".to_string()),
            ctime: Some(t),
            atime: Some(t),
            mtime: Some(t),
        };
        notes.push(note);
        let res = create_many_mdx_notes(&mut c, notes).await;
        assert!(
            res.is_none(),
            "Database saves mdx note without throwing an error."
        );
    }
}
