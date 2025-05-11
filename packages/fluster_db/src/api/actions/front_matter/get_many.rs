use crate::api::db::get_database_connection;
use crate::api::entities::mdx_note::front_matter::FrontMatterEntity;
use fluster_types::errors::errors::{FlusterError, FlusterResult};

pub async fn get_front_matter_entities() -> FlusterResult<Vec<FrontMatterEntity>> {
    if let Ok(mut conn) = get_database_connection().await {
        use diesel_async::RunQueryDsl;
        let front_matter =
            crate::api::schema::generated::main_schema::front_matter::dsl::front_matter;
        if let Ok(res) = front_matter
            .get_results::<FrontMatterEntity>(&mut conn)
            .await
        {
            Ok(res)
        } else {
            Err(FlusterError::FailToFind)
        }
    } else {
        Err(FlusterError::FailToFind)
    }
}
