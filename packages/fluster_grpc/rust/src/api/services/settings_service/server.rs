pub mod settings_proto {
    tonic::include_proto!("settings.v1");
}

#[derive(Debug, Default)]
struct SettingServiceHandler {}
