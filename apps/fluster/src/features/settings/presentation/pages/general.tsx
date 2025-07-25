import { FilePathInput, Form, SwitchInput } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import { setNotesDirectory, setRespectGitIgnore } from "#/settings/state/slice";
import { SettingPageContainer } from "../components/setting_page_container";
import { KeymapSettingsGroup } from "#/keymap/presentation/keymap_settings_table";

const connector = connect((state: AppState) => ({
    state: state.core,
}));

const schema = z.object({
    notesDirectory: z.string(),
    useGitIgnore: z.boolean(),
});

export const GeneralSettingsPage = connector(
    ({ state }: { state: AppState["core"] }): ReactNode => {
        const dispatch = useDispatch();
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                notesDirectory: state?.notesDirectory ?? "",
                useGitIgnore: state?.useGitIgnore ?? false,
            },
        });

        form.watch((formData) => {
            if (formData.notesDirectory) {
                dispatch(setNotesDirectory(formData.notesDirectory));
            }
            if (typeof formData.useGitIgnore === "boolean") {
                dispatch(setRespectGitIgnore(formData.useGitIgnore));
            }
        });

        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="General Settings" />
                    <FilePathInput
                        label="Notes Directory"
                        form={form}
                        name="notesDirectory"
                        directory
                        classes={{
                            formItem: "w-full max-w-full",
                            container: "w-full max-w-full",
                        }}
                    />
                    <SwitchInput
                        form={form}
                        name={"useGitIgnore"}
                        label="Respect .gitignore"
                        desc="If true, files ignored by a .gitignore file within your notes will be ignored by Fluster as well. Be aware that some notes may be visible under file glob based search even when ignored."
                    />
                    <SettingPageTitle
                        title="Keymap"
                        subtitle="Customizing keymaps is in beta. This feature may be unreliable."
                    />
                    <KeymapSettingsGroup />
                </SettingPageContainer>
            </Form>
        );
    }
);

GeneralSettingsPage.displayName = "GeneralSettingsPage";
