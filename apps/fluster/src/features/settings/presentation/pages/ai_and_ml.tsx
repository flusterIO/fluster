import React, { type ReactNode } from "react";
import { z } from "zod";
import { SettingPageContainer } from "../components/setting_page_container";
import { Form } from "@fluster.io/dev";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
import { LocalModelTable } from "#/ai/presentation/local_model_table";

const schema = z.object({
    defaultLanguageModel: z.string(),
});

const connector = connect((state: AppState) => ({
    ai: state.ai,
}));

export const AiAndMLSettingsPage = connector(
    ({ ai: { defaultLanguageModel } }: { ai: AppState["ai"] }): ReactNode => {
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                defaultLanguageModel: defaultLanguageModel,
            },
        });
        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="AI & Machine Learning" />
                    <LocalModelTable />
                </SettingPageContainer>
            </Form>
        );
    }
);

AiAndMLSettingsPage.displayName = "AiAndMLSettingsPage";
