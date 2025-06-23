use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub enum NavigationItemCategory {
    Dashboard,
}

#[derive(Serialize, Deserialize)]
pub struct NavigationItem {
    pub label: String,
    pub href: String,
    pub cat: NavigationItemCategory,
}
