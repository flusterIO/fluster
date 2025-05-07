// FIXME: Conver the sections map to a parallel iterator with rayon.

use crate::api::models::enums::setting_page_ids::SettingSectionId;
use serde::{Deserialize, Serialize};

use super::{setting_page_id::SettingPageId, setting_section::SettingSection};

use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone)]
pub struct SettingPage {
    pub label: String,
    pub desc: String,
    pub id: SettingPageId,
    pub sections: HashMap<SettingSectionId, SettingSection>,
}
