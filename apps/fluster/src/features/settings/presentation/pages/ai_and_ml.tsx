import React, { type ReactNode } from "react";
import { z } from "zod";
import { SettingPageContainer } from "../components/setting_page_container";
import { Form, GeneralSlider, Hint } from "@fluster.io/dev";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppState } from "@/state/initial_state";
import { connect, useDispatch } from "react-redux";
import { LocalModelTable } from "#/ai/presentation/local_model_table";
import {
    setAiDefaultProperties,
    setDefaultLanguageModel,
    setEmbeddingModel,
} from "#/ai/state/slice";

const schema = z.object({
    defaultLanguageModel: z.string(),
    defaultTemperature: z.number(),
    defaultTopP: z.number(),
    defaultTopK: z.number(),
    defaultRepeatPenalty: z.number(),
});

const connector = connect((state: AppState) => ({
    ai: state.ai,
}));

export const AiAndMLSettingsPage = connector(
    ({
        ai: {
            defaultLanguageModel,
            embeddingModel,
            defaultRepeatPenalty,
            defaultTopK,
            defaultTopP,
            defaultTemperature,
        },
    }: {
        ai: AppState["ai"];
    }): ReactNode => {
        const dispatch = useDispatch();
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                defaultLanguageModel,
                defaultTemperature,
                defaultTopP,
                defaultTopK,
                defaultRepeatPenalty,
            },
        });

        const handleLanguageModelRowClick = async (
            languageModel: string
        ): Promise<void> => {
            dispatch(setDefaultLanguageModel(languageModel));
        };
        const handleEmeddingModelRowClick = async (
            embeddingModelName: string
        ): Promise<void> => {
            dispatch(setEmbeddingModel(embeddingModelName));
        };

        form.watch((formState) => {
            dispatch(setAiDefaultProperties(formState));
        });
        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="AI & Machine Learning" />
                    <div className="text-xl font-semibold mb-0">
                        Set Local Language Model
                    </div>
                    <p className="text-sm text-muted-foreground !mt-2">
                        This is the model that will be used as the default model for local
                        AI chats, generating note summaries and other LLM related tasks.
                        This model will not have a major impact on sync times.
                    </p>
                    <LocalModelTable
                        activeModelName={defaultLanguageModel}
                        setOnClick={handleLanguageModelRowClick}
                        perPage={5}
                    />
                    <div className="text-xl font-semibold">Set Embedding Model</div>
                    <p className="text-sm text-muted-foreground !mt-2">
                        This is the model that will be used to generate vectors for your
                        data. The more powerful the model, the more accurate your semantic
                        search will be, but this will come at the cost of longer sync times
                        when syncing 'with AI'.
                    </p>
                    <Hint>
                        Unless you really know what you're doing, you probably want to use
                        the <span className="italic">nomic-embed-text</span> model. Using
                        other models may cause issues when syncing your database, and using
                        alternative models should be considered a beta feature for now.
                    </Hint>
                    <LocalModelTable
                        activeModelName={embeddingModel}
                        setOnClick={handleEmeddingModelRowClick}
                        perPage={5}
                    />
                    <div className="text-xl font-semibold">Default Chat Settings</div>
                    <p className="text-sm text-muted-foreground !mt-2">
                        Along with the default models above, these settings will be applied
                        as the default settings for newly created AI chats.
                    </p>
                    <GeneralSlider
                        form={form}
                        name="defaultTopP"
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
                        name="defaultTopK"
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
                        name="defaultRepeatPenalty"
                        label="Repeat Penalty"
                        desc="Sets how strongly to penalize repetitions. A higher value (e.g., 1.5) will penalize repetitions more strongly, while a lower value (e.g., 0.9) will be more lenient."
                        showValue
                        sliderProps={{
                            max: 10,
                            min: 0,
                            step: 0.1,
                        }}
                    />
                </SettingPageContainer>
            </Form>
        );
    }
);

AiAndMLSettingsPage.displayName = "AiAndMLSettingsPage";
