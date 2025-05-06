use std::collections::HashMap;

use super::{setting_page::SettingPage, setting_page_id::SettingPageId};

pub struct Settings {
    pub pages: HashMap<SettingPageId, SettingPage>,
    pub is_seeded: bool,
}
