import {
    AiLoadingState,
    useAiChatContext,
    useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import { Input } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const AiChatTextInput = ({
    handleSubmit,
    id,
}: {
    handleSubmit: () => Promise<void>;
    id: string;
}): ReactNode => {
    const state = useAiChatContext();
    const dispatch = useAiChatDispatch();
    return (
        <Input
            className="w-full"
            id={id}
            value={state.inputValue}
            disabled={state.loading === AiLoadingState.pending}
            onChange={(e) =>
                dispatch({
                    type: "setChatInputValue",
                    payload: e.target.value,
                })
            }
            onKeyDown={(e) => {
                if (e.key === "Enter" && e.metaKey) {
                    handleSubmit();
                }
            }}
        />
    );
};

AiChatTextInput.displayName = "AiChatTextInput";
