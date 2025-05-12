use diesel_async::RunQueryDsl;
use fluster_types::errors::errors::FlusterError;

use crate::api::{db::get_database_connection, entities::mdx_note::mdx_note_entity::MdxNoteEntity};

pub async fn create_mdx_note(new_note: MdxNoteEntity) -> Option<FlusterError> {
    use crate::api::schema::generated::main_schema::mdx_note::dsl::*;
    if let Ok(mut c) = get_database_connection().await {
        match diesel::insert_into(mdx_note)
            .values(&new_note)
            .execute(&mut c)
            .await
        {
            Ok(_) => None,
            Err(_) => {
                let p = match new_note.file_path {
                    // The string needs to be formatted like this every time it is passed into this
                    // specific error to format the message properly.
                    Some(x) => format!(" at {}", x),
                    None => "".to_string(),
                };
                Some(FlusterError::FailToSaveMdxNote(p))
            }
        }
    } else {
        Some(FlusterError::FailToConnect)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn create_mdx_note_saves_successfully() {
        let t = chrono::NaiveDateTime::from_timestamp(0, 0);
        let note = MdxNoteEntity {
            id: 0,
            raw_body: "This is a test from create_mdx_note_saves_successfully.".to_string(),
            file_path: Some("/some/fake/path".to_string()),
            ctime: t,
            atime: t,
            mtime: t,
        };
        let res = create_mdx_note(note).await;
        assert!(
            res.is_none(),
            "Database saves mdx note without throwing an error."
        );
    }
}
