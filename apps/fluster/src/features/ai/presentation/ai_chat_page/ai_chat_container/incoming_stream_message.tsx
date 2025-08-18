import { useAiChatContext } from "#/ai/state/chat/chat_context";
import React, { useEffect, useState, type ReactNode } from "react";
import { AiChatIncomingMessage } from "./incoming_message";
import { useSearchParams } from "react-router";

export const IncomingStreamMessage = (): ReactNode => {
  const state = useAiChatContext();
  const [body, setBody] = useState<string | null>(null);
  useEffect(() => {
    setBody(state.incomingStreamBody);
  }, [state.incomingStreamBody]);
  const [sp] = useSearchParams();
  const chatId = sp.get("chat_id");
  if (state.incomingStreamBody === null) {
    return null;
  }
  return (
    <AiChatIncomingMessage
      key={"incoming-stream-msg"}
      data={{
        chat_id: chatId ?? "",
        body: body ?? "",
        id: "",
        role: "Assistant",
        sent_at: new Date().valueOf().toString(),
      }}
    />
  );
};

IncomingStreamMessage.displayName = "IncomingStreamMessage";
