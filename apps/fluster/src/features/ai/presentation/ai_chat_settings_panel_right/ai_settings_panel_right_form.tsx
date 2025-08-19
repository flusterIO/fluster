import { AiChatModel, commands } from "@/lib/bindings";
import { showToast, Form } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { LocalModelSelectInput } from "./model_select_input";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { z } from "zod";

const connector = connect((state: AppState) => ({
    defaultLanguageModel: state.ai.defaultLanguageModel,
}));

const schema = z.object({
    model: z.string(),
});

interface AiSettingsPanelRightFormProps {
    model: AiChatModel;
    defaultLanguageModel: AppState["ai"]["defaultLanguageModel"];
}

export const AiSettingsPanelRightForm = connector(
    ({
        model,
        defaultLanguageModel,
    }: AiSettingsPanelRightFormProps): ReactNode => {
        /* const isChatPage = useMatch(AppRoutes.aiMainChat); */
        const [sp] = useSearchParams();
        const chatId = sp.get("chat_id");
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                model: model.model ?? defaultLanguageModel,
            },
        });

        form.watch(async (formState) => {
            if (chatId && formState.model) {
                const chat = await commands.getAiChatById(chatId);
                console.log("chat: ", chat);
                if (chat.status !== "ok") {
                    return showToast({
                        title: "Error",
                        body: "Fluster could not gather the necessary data to perform this action.",
                        duration: 5000,
                        variant: "Error",
                    });
                }
                const res = await commands.setChatModel({
                    ...chat.data.chat,
                    model: formState.model,
                    ctime: dayjs(chat.data.chat.ctime, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf()
                        .toString(),
                } satisfies AiChatModel);
                if (res.status !== "ok") {
                    showToast({
                        title: "Oh no",
                        body: "Something went wrong while updating your prefered model.",
                        duration: 5000,
                        variant: "Error",
                    });
                }
            }
        });

        if (!chatId) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center flex flex-col justify-center items-center">
                        <div className="text-xl font-semibold">No options available.</div>
                        <div className="text-sm">Select a chat to continue.</div>
                    </div>
                </div>
            );
        }
        return (
            <Form {...form}>
                <form className="w-full h-full space-y-6">
                    <LocalModelSelectInput
                        label="Model"
                        placeholder="deepseek-r1"
                        form={form}
                        name="model"
                        desc="Override the default model for this chat."
                        classes={{
                            formItem: "w-full min-w-full",
                            selectTrigger: "w-full min-w-full",
                        }}
                        ids={{
                            trigger: "model-select-input",
                        }}
                    />
                </form>
            </Form>
        );
    }
);

AiSettingsPanelRightForm.displayName = "AiSettingsPanelRightForm";
