import React, { type ReactNode } from "react";
import { z } from "zod";
import { SettingPageContainer } from "../components/setting_page_container";
import { Form, Hint } from "@fluster.io/dev";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppState } from "@/state/initial_state";
import { connect, useDispatch } from "react-redux";
import { LocalModelTable } from "#/ai/presentation/local_model_table";
import { setDefaultLanguageModel, setEmbeddingModel } from "#/ai/state/slice";

const schema = z.object({
    defaultLanguageModel: z.string(),
});

const connector = connect((state: AppState) => ({
    ai: state.ai,
}));

export const AiAndMLSettingsPage = connector(
    ({
        ai: { defaultLanguageModel, embeddingModel },
    }: {
        ai: AppState["ai"];
    }): ReactNode => {
        const dispatch = useDispatch();
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                defaultLanguageModel: defaultLanguageModel,
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
                        the <span className="italic">nomic-embed-text</span> model.
                    </Hint>
                    <LocalModelTable
                        activeModelName={embeddingModel}
                        setOnClick={handleEmeddingModelRowClick}
                        perPage={5}
                    />
                </SettingPageContainer>
            </Form>
        );
    }
);

AiAndMLSettingsPage.displayName = "AiAndMLSettingsPage";
