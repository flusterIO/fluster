pub fn on_desktop_init() {
    let res = fluster_logger::logger::get_logger();
    if res.is_err() {
        println!("Failed to initialize logger.");
    }
}
