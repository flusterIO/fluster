import React, { useEffect, type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { TextInputType } from "#/ai/state/ai_state";
import { AiChatCodeEditor } from "./inputs/ai_chat_code_editor";
import { AiChatTextArea } from "./inputs/ai_chat_text_area";
import { AiChatTextInput } from "./inputs/ai_chat_text_input";

const connector = connect((state: AppState) => ({
    inputType: state.ai.aiChatInput,
    leftPanelOpen: state.panelLeft.open,
    rightPanelOpen: state.panelRight.open,
}));

export const AiChatInput = connector(
    ({
        handleSubmit,
        inputType,
        leftPanelOpen,
        rightPanelOpen,
    }: {
        handleSubmit: () => Promise<void>;
        inputType: AppState["ai"]["aiChatInput"];
        leftPanelOpen: boolean;
        rightPanelOpen: boolean;
    }): ReactNode => {
        useEffect(() => {
            if (!leftPanelOpen && !rightPanelOpen) {
                let em = document.getElementById("ai-chat-input");
                if (!em) {
                    return;
                }
                if (em.nodeName === "DIV") {
                    em = em.querySelector("textarea");
                }
                em?.focus();
            }
        }, [leftPanelOpen, rightPanelOpen]);
        switch (inputType) {
            case TextInputType.editor:
                return (
                    <AiChatCodeEditor id="ai-chat-input" handleSubmit={handleSubmit} />
                );
            case TextInputType.multiline:
                return (
                    <AiChatTextArea id="ai-chat-input" handleSubmit={handleSubmit} />
                );

            case TextInputType.singleLine:
                return (
                    <AiChatTextInput id="ai-chat-input" handleSubmit={handleSubmit} />
                );
        }
    }
);

AiChatInput.displayName = "AiChatInput";
