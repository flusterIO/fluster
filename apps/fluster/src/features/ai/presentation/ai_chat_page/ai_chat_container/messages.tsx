import {
  useAiChatContext,
  useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import React, { useEffect, useRef, type ReactNode } from "react";
import { AiChatOutgoingMessage } from "./outgoing_message";
import { AiChatIncomingMessage } from "./incoming_message";
import { useSearchParams } from "react-router";
import { AiChatMessageUpdateEventProps, commands } from "@/lib/bindings";
import { useEventListener } from "@fluster.io/dev";
import { IncomingStreamMessage } from "./incoming_stream_message";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { CrossLanguageEvents } from "@/lib/bindings";

interface RequestChatUpdateEventProps {
  chatId: string;
}

declare global {
  interface WindowEventMap {
    "request-chat-update": CustomEvent<RequestChatUpdateEventProps>;
    "ai-chat-message-stream": CustomEvent<AiChatMessageUpdateEventProps>;
  }
}

export const AiChatMessageList = (): ReactNode => {
  const state = useAiChatContext();
  const unlisten = useRef<null | UnlistenFn>(null);
  const dispatch = useAiChatDispatch();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat_id");

  const getChatData = async (_chatId: string): Promise<void> => {
    const res = await commands.getAiChatById(_chatId);
    if (res.status === "ok") {
      dispatch({
        type: "setChatData",
        payload: res.data,
      });
    } else {
      console.error(`An error occurred while gathering chat for id ${_chatId}`);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatData(chatId);
    } else {
      dispatch({
        type: "setChatData",
        payload: null,
      });
    }
    /* eslint-disable-next-line  --  */
  }, [chatId]);

  useEventListener("request-chat-update", (e) => {
    if (e.detail.chatId === state.data?.chat.id) {
      getChatData(e.detail.chatId);
    }
  });

  useEventListener("ai-chat-message-stream", (e) => {
    if (e.detail.chat_id === chatId) {
      dispatch({
        type: "setAiChatIncomingStreamData",
        payload: e.detail.content,
      });
    }
  });

  return (
    <div className="ai-chat-msg-list px-4 w-full h-full flex flex-col justify-end items-center gap-6 overflow-y-auto flex-grow">
      {(state.data?.messages ?? []).map((msg) => {
        return msg.role === "User" ? (
          <AiChatOutgoingMessage key={msg.id} data={msg} />
        ) : (
          <AiChatIncomingMessage key={msg.id} data={msg} />
        );
      })}
      <IncomingStreamMessage />
    </div>
  );
};

AiChatMessageList.displayName = "AiChatMessageList";
