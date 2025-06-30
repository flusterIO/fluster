use rand::{distr::Alphanumeric, rng, Rng};

#[tauri::command]
#[specta::specta]
pub async fn generate_new_token(length: usize) -> String {
    rng()
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn gets_token() {
        let token = generate_new_token(64).await;
        println!("Length: {:?}", token);
        assert!(token.len() == 64, "Returns a token of the proper length");
    }
}
