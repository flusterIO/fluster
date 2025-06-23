import { AiLoadingState, useAiChatContext } from "#/ai/state/chat/chat_context";
import React, { type ReactNode } from "react";
import { BarLoader } from "react-spinners";

export const AiChatLoadingIndicator = (): ReactNode => {
    const state = useAiChatContext();
    const loading = state.loading === AiLoadingState.pending;
    return (
        <div className="w-full h-2">
            {loading && (
                <BarLoader className="!w-full h-full" color="hsl(var(--primary))" />
            )}
        </div>
    );
};

AiChatLoadingIndicator.displayName = "AiChatLoadingIndicator";
