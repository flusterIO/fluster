import { useAiChatContext } from "#/ai/state/chat/chat_context";
import React, { type ReactNode } from "react";
import { AiChatIncomingMessage } from "./incoming_message";

export const IncomingStreamMessage = (): ReactNode => {
    const state = useAiChatContext();
    if (state.incomingStreamBody === null) {
        return null;
    }
    return (
        <AiChatIncomingMessage
            key={"incoming-stream-msg"}
            data={state.incomingStreamBody}
        />
    );
};

IncomingStreamMessage.displayName = "IncomingStreamMessage";
