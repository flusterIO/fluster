use tauri::ipc::Channel;

use crate::core::events::show_toast::ToastConfig;

pub type ToastChannel = Channel<ToastConfig>;
