use fluster_types::errors::errors::{FlusterError, FlusterResult};

use crate::api::{
    data_interface::database::db::get_database_connection,
    models::mdx_note::mdx_note_entity::MdxNoteEntity,
};

// RESUME: Fix this error and the database workflow should be good to go!
#[allow(clippy::bind_instead_of_map)]
pub async fn get_mdx_note_summaries() -> FlusterResult<Vec<MdxNoteEntity>> {
    use crate::api::data_interface::database::schema::generated::main_schema::mdx_note::dsl::*;
    if let Ok(mut conn) = get_database_connection().await {
        use diesel_async::RunQueryDsl;
        let res = mdx_note
            .load::<MdxNoteEntity>(&mut conn)
            .await
            .or_else(|_| Err(FlusterError::FailToFind))?;
        Ok(res)
    } else {
        Err(FlusterError::FailToFind)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_mdx_summaries_succesfully() {
        let res = get_mdx_note_summaries().await;
        assert!(res.is_ok(), "Gets mdx summaries without throwing an error.");
        assert!(!res.unwrap().is_empty(), "Gets mdx summaries properly.");
    }
}
