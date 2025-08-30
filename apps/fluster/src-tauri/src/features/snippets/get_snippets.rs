use crate::{
    core::{database::db::get_database, types::errors::errors::FlusterResult},
    features::snippets::data::{
        snippet_model::SnippetData, snippet_tag_entity::SnippetTagEntity,
        snippet_tag_model::SnippetTagModel,
    },
};

use super::{data::snippet_entity::SnippetEntity, get_snippet_params::GetSnippetsParams};

#[tauri::command]
#[specta::specta]
pub async fn get_snippets(opts: GetSnippetsParams) -> FlusterResult<Vec<SnippetData>> {
    let db_res = get_database().await;
    let db = db_res.lock().await;
    let snippets = SnippetEntity::get_many(&db, opts).await?;
    let snippet_tags =
        SnippetTagEntity::get_by_snippet_ids(&db, snippets.iter().map(|x| x.id.clone()).collect())
            .await?;
    let mut data: Vec<SnippetData> = Vec::new();
    for snippet in snippets {
        let item_snippet_tags = snippet_tags
            .iter()
            .filter_map(|x| {
                if x.snippet_id == snippet.id {
                    Some(x.clone())
                } else {
                    None
                }
            })
            .collect::<Vec<SnippetTagModel>>();
        data.push(SnippetData {
            snippet,
            tags: item_snippet_tags,
        })
    }
    Ok(data)
}

#[cfg(test)]
mod tests {

    use super::*;

    #[tokio::test]
    async fn gets_snippets_without_langs() {
        let items = get_snippets(GetSnippetsParams { langs: None }).await;
        println!("Data: {:?}", items);
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        assert!(!items.unwrap().is_empty(), "Returned a non-empty list.");
        // assert_eq!(result, 4);
    }

    #[tokio::test]
    async fn gets_snippets_with_langs() {
        let items = get_snippets(GetSnippetsParams {
            langs: Some(vec!["python".to_string()]),
        })
        .await;
        println!("Data: {:?}", items);
        assert!(
            items.is_ok(),
            "Snippets are returned without throwing an error."
        );
        assert!(!items.unwrap().is_empty(), "Returned a non-empty list.");
        // assert_eq!(result, 4);
    }
}
