use flutter_rust_bridge::frb;

use crate::api::fs::fs_setup::setup_file_system_for_data;

pub fn on_desktop_init() {
    setup_file_system_for_data();
    fluster_logger::logger::get_logger();
}
