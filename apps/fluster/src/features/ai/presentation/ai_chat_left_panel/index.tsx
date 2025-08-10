import SidePanelContainer from "@/components/side_panel_container";
import { AiChatModel, commands } from "@/lib/bindings";
import { Form, TextInputGroup, Button, AppRoutes } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiChatHistoryCard } from "./ai_chat_card";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { useMatch } from "react-router";
import { onEnter } from "@/events/on_enter";
import { useEventListener } from "@/hooks/use_event_listener";

const schema = z.object({
    inputValue: z.string(),
});

const connector = connect((state: AppState) => ({
    open: state.panelLeft.open,
    defaultLanguageModel: state.ai.defaultLanguageModel,
}));

declare global {
    interface WindowEventMap {
        "request-new-chat-list": CustomEvent<object>;
    }
}

export const AiChatLeftPanel = connector(
    ({
        open,
        defaultLanguageModel,
    }: {
        open: boolean;
        defaultLanguageModel: string;
    }): ReactNode => {
        const [data, setData] = useState<AiChatModel[]>([]);
        const isChatScreen = useMatch(AppRoutes.aiMainChat);

        useEffect(() => {
            if (isChatScreen && open) {
                document.getElementById("create-chat-input")?.focus();
            }
        }, [isChatScreen, open]);
        const gatherChatData = async (): Promise<void> => {
            const res = await commands.getAllAiChats();
            if (res.status === "ok") {
                setData(res.data.sort((a, b) => parseInt(a.ctime) - parseInt(b.ctime)));
            } else {
                console.error(
                    "An error occurred while reading chat history.",
                    res.error
                );
            }
        };

        useEventListener("request-new-chat-list", gatherChatData);
        useEffect(() => {
            gatherChatData();
        }, []);
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                inputValue: "",
            },
        });
        const inputValue = form.watch("inputValue");
        const isValidInput = (inputValue: string): boolean => {
            return (
                inputValue.length > 3 &&
                !data.some((x) => x.label.toLowerCase() === inputValue.toLowerCase())
            );
        };
        const submitNewChat = async (): Promise<void> => {
            const value = form.getValues().inputValue;
            if (isValidInput(value)) {
                const res = await commands.createNewAiChat(value, defaultLanguageModel);
                if (res.status === "ok") {
                    form.setValue("inputValue", "");
                    await gatherChatData();
                }
            }
        };
        return (
            <SidePanelContainer className="px-4" label="Chat History">
                <Form {...form}>
                    <TextInputGroup
                        label="Create chat"
                        form={form}
                        name="inputValue"
                        inputProps={{
                            id: "create-chat-input",
                            onKeyDown: (e) =>
                                onEnter(
                                    e,
                                    () => {
                                        submitNewChat();
                                    },
                                    "onEnter"
                                ),
                        }}
                    />
                    <div className="flex flex-row justify-end items-center w-full">
                        <Button onClick={submitNewChat} disabled={inputValue.length <= 3}>
                            Create
                        </Button>
                    </div>
                </Form>
                <div className="w-full flex flex-col justify-center items-center gap-3">
                    {data.map((d) => {
                        return <AiChatHistoryCard key={`chat-${d.id}`} item={d} />;
                    })}
                </div>
            </SidePanelContainer>
        );
    }
);

AiChatLeftPanel.displayName = "AiChatLeftPanel";
