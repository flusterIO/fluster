
use super::data::traits::ai_provider::AiProvider;

pub struct AiClient {
    pub provider: dyn AiProvider,
}
