pub use fluster_types::errors::errors::{FlusterError, FlusterResult};

use crate::api::{
    data_interface::database::db::get_database_connection,
    models::front_matter::front_matter_entity::FrontMatterEntity,
};

pub async fn get_front_matter_entities() -> FlusterResult<Vec<FrontMatterEntity>> {
    if let Ok(mut conn) = get_database_connection().await {
        use crate::api::data_interface::database::schema::generated::main_schema::front_matter::dsl::*;
        use diesel_async::RunQueryDsl;
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
