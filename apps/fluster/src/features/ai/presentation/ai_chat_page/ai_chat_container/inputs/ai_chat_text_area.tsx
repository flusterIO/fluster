import { AiLoadingState, useAiChatContext } from "#/ai/state/chat/chat_context";
import { Textarea } from "@fluster.io/dev";
import React, { type ReactNode } from "react";

export const AiChatTextArea = ({
  handleSubmit,
  id,
  value,
  onChange,
}: {
  handleSubmit: () => Promise<void>;
  id: string;
  value: string;
  onChange: (s: string) => void;
}): ReactNode => {
  const state = useAiChatContext();
  return (
    <Textarea
      className="w-full h-fit"
      id={id}
      rows={3}
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

AiChatTextArea.displayName = "AiChatTextArea";
