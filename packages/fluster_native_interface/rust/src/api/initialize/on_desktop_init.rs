use crate::api::fs::fs_setup::setup_file_system_for_data;

pub async fn on_desktop_init() {
    setup_file_system_for_data().await;
    let res = fluster_logger::logger::get_logger();
    if res.is_err() {
        println!("Failed to initialize logger.");
    }
}
