import {
    AppRoutes,
    Button,
    CheckboxGroup,
    CheckboxGroupItem,
    FilePathInput,
    Form,
    GeneralSlider,
    Hint,
    showToast,
    SwitchInput,
} from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { SettingPageTitle } from "../components/setting_page_title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import {
    setDashboardType,
    setNotesDirectory,
    setRespectGitIgnore,
} from "#/settings/state/slice";
import { SettingPageContainer } from "../components/setting_page_container";
import { KeymapSettingsGroup } from "#/keymap/presentation/keymap_settings_table";
import { commands } from "@/lib/bindings";
import { useNavigate } from "react-router";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { AutoSettingTable } from "../components/auto_setting/auto_setting_table";
import { setWhiteboardTimeout } from "#/whiteboard/state/whiteboard_slice";
import { dashboardTypes } from "#/settings/state/core_settings";

const connector = connect((state: AppState) => ({
    state: state.core,
    whiteboardState: state.whiteboard,
}));

const schema = z.object({
    notesDirectory: z.string(),
    useGitIgnore: z.boolean(),
    whiteboardTimeout: z.number(),
    dashboardType: z.enum(dashboardTypes),
});

interface DashboardItem extends CheckboxGroupItem<string> {
    value: (typeof dashboardTypes)[number];
}

export const GeneralSettingsPage = connector(
    ({
        state,
        whiteboardState,
    }: {
        state: AppState["core"];
        whiteboardState: AppState["whiteboard"];
    }): ReactNode => {
        const confirmationId = "clear-database";
        const dispatch = useDispatch();
        const nav = useNavigate();
        const form = useForm({
            resolver: zodResolver(schema),
            defaultValues: {
                notesDirectory: state?.notesDirectory ?? "",
                useGitIgnore: state?.useGitIgnore ?? false,
                whiteboardTimeout: whiteboardState?.whiteboardTimeout ?? 1,
                dashboardType: state?.dashboardType ?? "dashboard",
            },
        });

        form.watch((formData) => {
            if (formData.notesDirectory) {
                dispatch(setNotesDirectory(formData.notesDirectory));
            }
            if (typeof formData.useGitIgnore === "boolean") {
                dispatch(setRespectGitIgnore(formData.useGitIgnore));
            }
            if (typeof formData.whiteboardTimeout === "number") {
                dispatch(setWhiteboardTimeout(formData.whiteboardTimeout));
            }
            if (typeof formData.dashboardType !== "undefined") {
                dispatch(setDashboardType(formData.dashboardType));
            }
        });

        const dashboardItems: DashboardItem[] = [
            {
                label: "Simple",
                desc: "A simple dashboard with a set of quick links.",
                value: "simple",
            },
            {
                label: "Dashboard",
                value: "dashboard",
                desc: "A more complete dashboard with quick access to your data.",
            },
        ];

        const showFailToClearNotification = (): void => {
            showToast({
                title: "Failed",
                body: "Something went wrong while attempting to clear your database.",
                duration: 5000,
                variant: "Error",
            });
        };

        const handleClearDatabase = async (): Promise<void> => {
            const res = await commands.wipeDatabase();
            if (res.status === "ok") {
                showToast({
                    title: "Success",
                    variant: "Info",
                    body: "Your database has been wiped successfully.",
                    duration: 5000,
                });
                nav(AppRoutes.onboarding);
            } else {
                showFailToClearNotification();
            }
        };

        const confirm = useConfirmation(
            {
                id: confirmationId,
                acceptButtonText: "Delete",
                denyButtonText: "Cancel",
                title: "Are you sure?",
                body: "This will permanently clear your database. Data that can not be automatically generated from your file system will be lost.",
                confirmationVariant: "destructive",
            },
            () => {
                handleClearDatabase().catch((err) => {
                    console.error("Error: ", err);
                    showFailToClearNotification();
                });
            }
        );

        form.watch((formState) => console.log("formState: ", formState))
        return (
            <Form {...form}>
                <SettingPageContainer>
                    <SettingPageTitle title="General Settings" />
                    <FilePathInput
                        label="Notes Directory"
                        form={form}
                        name="notesDirectory"
                        directory
                        desc="This is the primary directory that contains all of your notes. You can nest content in this directory as deeply as you wish."
                        classes={{
                            formItem: "w-full max-w-full",
                            container: "w-full max-w-full",
                        }}
                    />
                    <SwitchInput
                        form={form}
                        name={"useGitIgnore"}
                        label="Respect .gitignore"
                        desc="If true, files ignored by a .gitignore file within your notes will be ignored by Fluster as well. Be aware that some notes may be visible under file glob based search even when ignored in this manner."
                    />
                    <CheckboxGroup
                        label="Dashboard Type"
                        form={form}
                        name="dashboardType"
                        items={dashboardItems}
                    />
                    <GeneralSlider
                        form={form}
                        name="whiteboardTimeout"
                        label="Whiteboard Timeout"
                        desc={
                            "This is the number of seconds after each change the whiteboard will wait before saving data. Shorter periods are ideal but periods that are too short may cause performance issues."
                        }
                        sliderProps={{
                            min: 0,
                            max: 10,
                            step: 0.1,
                        }}
                        showValue
                    />
                    <SettingPageTitle
                        title="Keymap"
                        subtitle="Click on a keymap to modify it."
                    />
                    <Hint note>
                        Keep in mind that many of these keymaps are applied conditionally.
                        Not all pages have both a left and a right panel, for example.
                    </Hint>
                    <KeymapSettingsGroup />

                    <SettingPageTitle
                        subtitleClasses="text-sm"
                        title="Auto Settings"
                        subtitle="Use auto-settings to apply tags, topics or subjects to notes based on their file path. The glob you provide will be joined with your notes directory. All notes that satisfy the glob you provide will have the relevant tag, topic or subject applied automatically."
                    />
                    <AutoSettingTable />
                    <div className="bg-card rounded border px-4 py-3">
                        <SettingPageTitle
                            title="Danger"
                            subtitle="These actions are destructive and cannot be undone."
                        />
                        <Button
                            variant={"destructive"}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                confirm.setVisible(true);
                            }}
                        >
                            Clear Database
                        </Button>
                    </div>
                </SettingPageContainer>
            </Form>
        );
    }
);

GeneralSettingsPage.displayName = "GeneralSettingsPage";
