import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { AiChatInput } from "./input";
import { AiChatMessageList } from "./messages";
import {
    Button,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    showToast,
} from "@fluster.io/dev";
import {
    AiLoadingState,
    useAiChatContext,
    useAiChatDispatch,
} from "#/ai/state/chat/chat_context";
import { useSearchParams } from "react-router";
import { NoChatSelectedPlaceholder } from "./no_chat_selected";
import {
    AiChatMessageModel,
    AiChatMessageUpdateEventProps,
    commands,
} from "@/lib/bindings";
import { AiChatLoadingIndicator } from "./ai_chat_loading_indicator";
import { TextInputType } from "#/ai/state/ai_state";
import { useDispatch } from "react-redux";
import { setChatInputType } from "#/ai/state/slice";
import { useAiSyncSettings } from "#/ai/state/hooks/use_ai_sync_settings";
import { Channel } from "@tauri-apps/api/core";

export const AiChatContainer = (): ReactNode => {
    const context = useAiChatContext();
    const inputValue = useRef("");
    const dispatch = useAiChatDispatch();
    const globalDispatch = useDispatch();
    const aiSyncSettings = useAiSyncSettings(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        inputValue.current = context.inputValue;
    }, [context.inputValue]);

    const handleSubmitMessageRequest = async (val: string): Promise<void> => {
        const chatId = searchParams.get("chat_id");
        if (chatId) {
            dispatch({
                type: "setLoadingState",
                payload: AiLoadingState.pending,
            });
            const messageId = await commands.getUniqueId();
            const newChatRequest: AiChatMessageModel = {
                chat_id: chatId,
                id: messageId,
                body: val,
                role: "User",
                sent_at: new Date().valueOf().toString(),
            };
            dispatch({
                type: "appendUserMessage",
                payload: newChatRequest,
            });
            const streamChannel = new Channel<AiChatMessageUpdateEventProps>();
            streamChannel.onmessage = (streamData) => {
                window.dispatchEvent(
                    new CustomEvent("ai-chat-message-stream", {
                        detail: streamData,
                    })
                );
            };
            const chatData = await commands.getAiChatById(chatId);
            if (!chatData) {
                return showToast({
                    title: "An error occurred",
                    body: "Something went wrong whlie attempting to gather data related to this chat.",
                    variant: "Error",
                    duration: 5000,
                });
            }
            const res = await commands.addAiChatRequest(
                chatId,
                {
                    ...aiSyncSettings,
                    language_model:
                        chatData.status === "ok"
                            ? chatData.data.chat.model
                            : aiSyncSettings.language_model,
                },
                newChatRequest,
                context.data?.messages ?? [],
                streamChannel
            );
            if (res.status === "ok") {
                dispatch({
                    type: "chatRequestSuccess",
                    payload: null,
                });
                window.dispatchEvent(
                    new CustomEvent("request-chat-update", {
                        detail: {
                            chatId,
                        },
                    })
                );
                window.dispatchEvent(new CustomEvent("clear-ai-chat-input", {}));
            } else {
                console.error("An error occurred while generating a response message.");
            }
        } else {
            console.warn(`No chatId found`);
        }
    };

    const hasChatId = useMemo(() => {
        return searchParams.has("chat_id");
    }, [searchParams]);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            {hasChatId ? (
                <div className="@container/ai_chat_container w-full h-full max-h-full pt-8 gap-6 flex flex-col justify-center items-center">
                    <AiChatMessageList />
                    <div className="w-full px-4 py-3 flex flex-col justify-center items-center h-fit bg-card border-t">
                        <AiChatLoadingIndicator />
                        <AiChatInput handleSubmit={handleSubmitMessageRequest} />
                        <div className="w-full flex flex-row justify-between items-center mt-4">
                            <Select
                                onValueChange={(val) =>
                                    globalDispatch(setChatInputType(val as TextInputType))
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Inputs" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Inputs</SelectLabel>
                                        <SelectItem
                                            className="text-foreground"
                                            value={TextInputType.singleLine}
                                        >
                                            Single Line
                                        </SelectItem>
                                        <SelectItem
                                            className="text-foreground"
                                            value={TextInputType.multiline}
                                        >
                                            Multi Line
                                        </SelectItem>
                                        <SelectItem
                                            className="text-foreground"
                                            value={TextInputType.editor}
                                        >
                                            Code Editor
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={() => handleSubmitMessageRequest(inputValue.current)}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <NoChatSelectedPlaceholder />
            )}
        </div>
    );
};

AiChatContainer.displayName = "AiChatContainer";
