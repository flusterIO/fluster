use settings_proto::setting_service_server::SettingService;
// use settings_proto::setting_service_server
pub mod settings_proto {
    tonic::include_proto!("settings.v1");
}

#[derive(Debug, Default)]
pub struct SettingServiceHandler {}
