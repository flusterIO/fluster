use include_dir::{include_dir, Dir};
use serde::{Deserialize, Serialize};

use specta::Type;

#[derive(Type, Deserialize, Serialize)]
pub enum EmbeddedSystemPromptId {
    /// The default system prompt that provides the most general use case.
    DefaultSystemPrompt,
}

static EMBEDDED_SYSTEM_PROMPTS: Dir =
    include_dir!("$FLUSTER_NATIVE_ROOT/apps/fluster/src-tauri/src/features/ai/data/system_prompts");

pub fn get_embedded_system_prompt(id: EmbeddedSystemPromptId) -> String {
    match id {
        EmbeddedSystemPromptId::DefaultSystemPrompt => EMBEDDED_SYSTEM_PROMPTS
            .get_file("default_system_prompt.txt")
            .unwrap()
            .contents_utf8()
            .unwrap()
            .to_string(),
    }
}
