pub async fn upsert_settings(
    items: Vec<fluster_grpc::settings_proto::SettingItem>,
) -> Result<(), fluster_rust_types::database_errors::DatabaseError> {
    // let db = fluster_db::api::db::get_database(fluster_db::api::db::DatabaseOptions {
    //     ..Default::default()
    // })
    // .await;
    // if db.is_err() {
    //     return Err(fluster_rust_types::database_errors::DatabaseError::FailToConnect);
    // }
    // let db_items = items
    //     .iter()
    //     .map(|x| fluster_db::api::models::setting::Setting {
    //         label: &"Test label",
    //     });
    // let res = db
    //     .unwrap()
    //     .create(fluster_db::database_tables::DatabaseTables::Settings)
    //     .content(db_items)
    //     .await;
    // if res.is_err() {
    //     return Err(fluster_rust_types::database_errors::DatabaseError::FailToCreateAsset);
    // }
    return Ok(());
}
