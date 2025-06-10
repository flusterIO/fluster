use kalosm::language::*;

pub async fn get_embeddings(dir_path: &str) -> FlusterResult<()> {
    let f = DocumentFolder::new(dir_path).unwrap();
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_embeddings() {
        let res = get_embeddings("/Users/bigsexy/Desktop/notes/content/").await;
        assert!(res.is_ok(), "Get's embeddings without throwing an error.");
        // assert_eq!(result, 4);
    }
}
