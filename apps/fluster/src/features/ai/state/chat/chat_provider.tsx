import React, { useReducer } from "react";
import {
    AiChatContext,
    AiChatContextReducer,
    AiChatDispatchContext,
    AiChatProviderProps,
    initialAiChatState,
} from "./chat_context";

export const AiChatProvider = ({
    children,
    initialValues,
}: AiChatProviderProps) => {
    const [state, dispatch] = useReducer(
        AiChatContextReducer,
        initialValues
            ? { ...initialValues, ...initialAiChatState }
            : initialAiChatState
    );

    return (
        <AiChatContext.Provider value={state}>
            <AiChatDispatchContext.Provider value={dispatch}>
                {children}
            </AiChatDispatchContext.Provider>
        </AiChatContext.Provider>
    );
};
