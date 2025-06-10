use crate::core::types::errors::errors::FlusterResult;

use super::ai_providers::{ai_provider::AiProvider, ollama_provider::OllamaProvider};

pub struct AiClient {}

// FIXME: Add an onboarding screen and a field to the HealthReport struct that installs the text embedding model if it is not installed already.
impl AiClient {
    pub async fn get_provider() -> FlusterResult<Box<dyn AiProvider>> {
        // TODO: Handle the other providers here, and return an error if ollama is not already
        // installed.
        Ok(Box::new(OllamaProvider::new()))
    }
}
