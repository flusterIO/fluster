import { FilePathInput, Form } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { SettingPageTitle } from "../setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";

const connector = connect((state: AppState) => ({
    state: state.core,
}));

const schema = z.object({
    notesDirectory: z.string(),
});

export const GeneralSettingsPage = connector(
    ({ state }: { state: AppState["core"] }): ReactNode => {
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                notesDirectory: state?.notesDirectory ?? "",
            },
        });
        return (
            <Form {...form}>
                <form className="w-full space-y-6">
                    <SettingPageTitle title="General Settings" />
                    <FilePathInput
                        label="Notes Directory"
                        form={form}
                        name="notesDirectory"
                        directory
                    />
                </form>
            </Form>
        );
    }
);

GeneralSettingsPage.displayName = "GeneralSettingsPage";
