import { AiLoadingState, useAiChatContext } from "#/ai/state/chat/chat_context";
import { Input } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const AiChatTextInput = ({
  handleSubmit,
  id,
  onChange,
  value,
}: {
  handleSubmit: () => Promise<void>;
  id: string;
  value: string;
  onChange: (s: string) => void;
}): ReactNode => {
  const state = useAiChatContext();
  return (
    <Input
      className="w-full"
      id={id}
      value={value}
      disabled={state.loading === AiLoadingState.pending}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.metaKey) {
          handleSubmit();
        }
      }}
    />
  );
};

AiChatTextInput.displayName = "AiChatTextInput";
