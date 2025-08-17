import { AiSyncSettings } from "@/lib/bindings";
import { AppState } from "@/state/initial_state";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/** Takes the ai state as it occurrs in AppState and returns the AiSyncSettings struct used throughout Rust. */
export const aiStateToSyncSettings = (
    state: AppState["ai"],
    with_ai: boolean
): AiSyncSettings => {
    return {
        with_ai,
        max_text_split_tokens: state.maxTextSplitTokens as unknown as string,
        embedding_model: state.embeddingModel,
        language_model: state.defaultLanguageModel,
    };
};

export const useAiSyncSettings = (with_ai: boolean): AiSyncSettings => {
    const state = useSelector((state: AppState) => state.ai);
    const [data, setData] = useState<AiSyncSettings>(
        aiStateToSyncSettings(state, with_ai)
    );

    useEffect(() => {
        setData(aiStateToSyncSettings(state, with_ai));
        /* eslint-disable-next-line  --  */
    }, [state]);

    return data;
};
