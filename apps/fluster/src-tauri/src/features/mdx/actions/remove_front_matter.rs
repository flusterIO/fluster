use gray_matter::{engine::YAML, Matter};

#[tauri::command]
#[specta::specta]
pub async fn remove_front_matter(mdx_content: String) -> String {
    let matter = Matter::<YAML>::new();
    let res = matter.parse(&mdx_content);
    res.content
}
