import { AiChatModel, commands } from "@/lib/bindings";
import { showToast, Form, GeneralSlider } from "@fluster.io/dev";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useRef, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { LocalModelSelectInput } from "./model_select_input";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { z } from "zod";
import {
    DEFAULT_EMBEDDING_MODEL,
    DEFAULT_LANGUAGE_MODEL,
} from "#/ai/state/initial_ai_state";

const connector = connect((state: AppState) => ({
    defaultLanguageModel: state.ai.defaultLanguageModel,
    defaultTopK: state.ai.defaultTopK,
    defaultTopP: state.ai.defaultTopP,
    defaultRepeatPenalty: state.ai.defaultRepeatPenalty,
    defaultTemperature: state.ai.defaultTemperature,
}));

const schema = z.object({
    model: z.string(),
    temperature: z.number(),
    topP: z.number(),
    topK: z.number(),
    repeatPenalty: z.number(),
});

interface AiSettingsPanelRightFormProps {
    model: AiChatModel;
    defaultLanguageModel: AppState["ai"]["defaultLanguageModel"];
    defaultTopK: AppState["ai"]["defaultTopK"];
    defaultTopP: AppState["ai"]["defaultTopP"];
    defaultRepeatPenalty: AppState["ai"]["defaultRepeatPenalty"];
    defaultTemperature: AppState["ai"]["defaultTemperature"];
}

export const AiSettingsPanelRightForm = connector(
    ({
        model,
        defaultLanguageModel,
        defaultRepeatPenalty,
        defaultTopP,
        defaultTopK,
        defaultTemperature,
    }: AiSettingsPanelRightFormProps): ReactNode => {
        const [sp] = useSearchParams();
        const chatId = sp.get("chat_id");
        const timer = useRef<NodeJS.Timeout | null>(null);
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                model: model.model ?? defaultLanguageModel,
                temperature: model.temperature ?? defaultTemperature ?? 0.2,
                topP: model.top_p ?? defaultTopP ?? 0.25,
                topK: model.top_k ?? defaultTopK ?? 25,
                repeatPenalty: model.repeat_penalty ?? defaultRepeatPenalty ?? 1.5,
            },
        });

        const updateChat = async (
            data: Partial<z.infer<typeof schema>>
        ): Promise<void> => {
            if (!chatId) {
                return;
            }
            const chat = await commands.getAiChatById(chatId);
            if (chat.status !== "ok") {
                return showToast({
                    title: "Error",
                    body: "Fluster could not gather the necessary data to perform this action.",
                    duration: 5000,
                    variant: "Error",
                });
            }
            const res = await commands.saveChatModel({
                repeat_penalty: data.repeatPenalty ?? chat.data.chat.repeat_penalty,
                top_k: data.topK ?? chat.data.chat.top_k,
                top_p: data.topP ?? chat.data.chat.top_p,
                temperature: data.temperature ?? chat.data.chat.temperature,
                model: data.model ?? chat.data.chat.model,
                id: chat.data.chat.id,
                label: chat.data.chat.label,
                ctime: dayjs(chat.data.chat.ctime, {
                    utc: true,
                })
                    .toDate()
                    .valueOf()
                    .toString(),
            } satisfies AiChatModel);
            console.log("res: ", res);
            if (res.status !== "ok") {
                showToast({
                    title: "Oh no",
                    body: "Something went wrong while updating your prefered model.",
                    duration: 5000,
                    variant: "Error",
                });
            }
        };

        form.watch(async (formState) => {
            if (!chatId) {
                return;
            }
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                updateChat(formState);
            }, 500);
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
                    <GeneralSlider
                        form={form}
                        name="topP"
                        label="Top P"
                        desc="Works together with top-k. A higher value (e.g., 0.95) will lead to more diverse text, while a lower value (e.g., 0.5) will generate more focused and conservative text."
                        showValue
                        sliderProps={{
                            max: 2,
                            min: 0,
                            step: 0.05,
                        }}
                    />
                    <GeneralSlider
                        form={form}
                        name="topK"
                        label="Top K"
                        desc="Reduces the probability of generating nonsense. A higher value (e.g. 100) will give more diverse answers, while a lower value (e.g. 10) will be more conservative."
                        showValue
                        sliderProps={{
                            max: 200,
                            min: 1,
                            step: 1,
                        }}
                    />
                    <GeneralSlider
                        form={form}
                        name="repeatPenalty"
                        label="Repeat Penalty"
                        desc="Sets how strongly to penalize repetitions. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient."
                        showValue
                        sliderProps={{
                            max: 10,
                            min: 0,
                            step: 0.1,
                        }}
                    />
                </form>
            </Form>
        );
    }
);

AiSettingsPanelRightForm.displayName = "AiSettingsPanelRightForm";
