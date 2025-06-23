import {
    AiLoadingState,
    useAiChatContext,
    useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import { Textarea } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const AiChatTextArea = ({
    handleSubmit,
    id,
}: {
    handleSubmit: () => Promise<void>;
    id: string;
}): ReactNode => {
    const state = useAiChatContext();
    const dispatch = useAiChatDispatch();
    return (
        <Textarea
            className="w-full h-fit"
            id={id}
            rows={3}
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

AiChatTextArea.displayName = "AiChatTextArea";
