pub mod settings_proto {
    tonic::include_proto!("settings.v1.proto");
}

#[derive(Debug, Default)]
struct SettingServiceHandler {}
