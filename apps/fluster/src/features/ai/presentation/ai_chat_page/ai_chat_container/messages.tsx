import {
    useAiChatContext,
    useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import React, { useEffect, useMemo, type ReactNode } from "react";
import { AiChatOutgoingMessage } from "./outgoing_message";
import { AiChatIncomingMessage } from "./incoming_message";
import { useSearchParams } from "react-router";
import { commands } from "@/lib/bindings";
import { useEventListener } from "@fluster.io/dev";

interface RequestChatUpdateEventProps {
    chatId: string;
}

declare global {
    interface WindowEventMap {
        "request-chat-update": CustomEvent<RequestChatUpdateEventProps>;
    }
}

export const AiChatMessageList = (): ReactNode => {
    const state = useAiChatContext();
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
        console.log(`HEre?`);
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

    const messages = useMemo(() => {
        console.log(`here`);
        return [
            ...(state.data?.outgoing ?? []),
            ...(state.data?.incoming ?? []),
        ].sort((a, b) => {
            const a_at = new Date("received_at" in a ? a.received_at : a.sent_at);
            const b_at = new Date("received_at" in b ? b.received_at : b.sent_at);
            return a_at.valueOf() - b_at.valueOf();
        });
    }, [state.data?.incoming, state.data?.outgoing]);
    return (
        <div className="ai-chat-msg-list px-4 w-full h-full flex flex-col justify-end items-center gap-6 overflow-y-auto flex-grow">
            {messages.map((msg) => {
                return "sent_at" in msg ? (
                    <AiChatOutgoingMessage key={msg.id} data={msg} />
                ) : (
                    <AiChatIncomingMessage key={msg.id} data={msg} />
                );
            })}
        </div>
    );
};

AiChatMessageList.displayName = "AiChatMessageList";
