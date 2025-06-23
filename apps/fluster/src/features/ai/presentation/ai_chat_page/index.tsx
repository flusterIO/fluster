import React, { type ReactNode } from "react";
import { AiChatContainer } from "./ai_chat_container";
import { AiChatProvider } from "#/ai/state/chat/chat_provider";

export const AiChatPage = (): ReactNode => {
    return (
        <div 
            id="ai-chat-page-container"
            className="h-screen mt-[-2rem] w-full"
        >
            <AiChatProvider>
                <AiChatContainer />
            </AiChatProvider>
        </div>
    );
};

AiChatPage.displayName = "AiChatPage";
