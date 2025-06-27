import React, { useEffect, useState, type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { TextInputType } from "#/ai/state/ai_state";
import { AiChatCodeEditor } from "./inputs/ai_chat_code_editor";
import { AiChatTextArea } from "./inputs/ai_chat_text_area";
import { AiChatTextInput } from "./inputs/ai_chat_text_input";
import { useEventListener } from "@fluster.io/dev";

const connector = connect((state: AppState) => ({
  inputType: state.ai.aiChatInput,
  leftPanelOpen: state.panelLeft.open,
  rightPanelOpen: state.panelRight.open,
}));

declare global {
   
  interface WindowEventMap {
    "clear-ai-chat-input": CustomEvent<object>;
  }
}

export const AiChatInput = connector(
  ({
    handleSubmit,
    inputType,
    leftPanelOpen,
    rightPanelOpen,
  }: {
    handleSubmit: (val: string) => Promise<void>;
    inputType: AppState["ai"]["aiChatInput"];
    leftPanelOpen: boolean;
    rightPanelOpen: boolean;
  }): ReactNode => {
    const [value, setValue] = useState("");
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
    useEventListener("clear-ai-chat-input", () => setValue(""));
    switch (inputType) {
      case TextInputType.editor:
        return (
          <AiChatCodeEditor
            value={value}
            onChange={setValue}
            id="ai-chat-input"
            handleSubmit={() => handleSubmit(value)}
          />
        );
      case TextInputType.multiline:
        return (
          <AiChatTextArea
            value={value}
            onChange={setValue}
            id="ai-chat-input"
            handleSubmit={() => handleSubmit(value)}
          />
        );

      case TextInputType.singleLine:
        return (
          <AiChatTextInput
            value={value}
            onChange={setValue}
            id="ai-chat-input"
            handleSubmit={() => handleSubmit(value)}
          />
        );
    }
  }
);

AiChatInput.displayName = "AiChatInput";
