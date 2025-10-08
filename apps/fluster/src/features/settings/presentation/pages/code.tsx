import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { connect, useDispatch } from "react-redux";
import { AppState } from "@/state/initial_state";
import {
    Button,
    Form,
    GeneralSelectInput,
    GeneralSlider,
    H3,
    SelectOption,
    Slider,
    SyntaxSupportedLanguageSelect,
    TextAreaInput,
    TextInputGroup,
} from "@fluster.io/dev";
import {
    setDefaultLanguage,
    setEditorKeymap,
    setJupyterState,
    setPreviewDebounce,
} from "#/editor/state/slice";
import { BundledLanguage } from "shiki";
import { SettingPageTitle } from "../components/setting_page_title";
import { SettingPageContainer } from "../components/setting_page_container";
import { commands } from "@/lib/bindings";

const connector = connect((state: AppState) => ({
    state: state.code,
}));

interface Props {
    state: AppState["code"];
}

const schema = z.object({
    defaultLanguage: z.string(),
    keymap: z.literal("vim").or(z.literal("standard")),
    port: z.coerce.number().int(),
    kernel: z.string(),
    token: z.string(),
    previewDebounce: z.number(),
});

const keymapOptions: SelectOption<AppState["code"]["keymap"]>[] = [
    {
        label: "Standard",
        value: "standard",
    },
    {
        label: "Vim",
        value: "vim",
    },
];

export const CodeSettingsPage = connector(({ state }: Props): ReactNode => {
    const dispatch = useDispatch();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            defaultLanguage: state.defaultLanguage,
            keymap: state.keymap,
            port: state.jupyter.port,
            token: state.jupyter.token,
            kernel: state.jupyter.defaultKernelName,
            previewDebounce: state.previewDebounce,
        },
    });

    form.watch((formState) => {
        if (formState.defaultLanguage) {
            dispatch(
                setDefaultLanguage(formState.defaultLanguage as BundledLanguage)
            );
        }
        if (formState.keymap) {
            console.log("setting keymap: ");
            dispatch(setEditorKeymap(formState.keymap));
        }
        if (formState.token) {
            dispatch(
                setJupyterState({
                    token: formState.token,
                })
            );
        }
        if (formState.kernel) {
            dispatch(
                setJupyterState({
                    defaultKernelName: formState.kernel,
                })
            );
        }
        if (formState.port) {
            dispatch(
                setJupyterState({
                    port: formState.port,
                })
            );
        }

        if (typeof formState.previewDebounce === "number") {
            dispatch(setPreviewDebounce(formState.previewDebounce));
        }
    });

    const generateToken = async (): Promise<void> => {
        // Had to apply this bandaid because of improperly generated types by specta.
        const res = await commands.generateNewToken(64 as unknown as string);
        form.setValue("token", res);
    };

    return (
        <Form {...form}>
            <SettingPageContainer>
                <SettingPageTitle title="Code Settings" />
                <SyntaxSupportedLanguageSelect
                    form={form}
                    name="defaultLanguage"
                    label="Default Language"
                    classes={{
                        button: "w-full",
                    }}
                />
                <GeneralSelectInput
                    placeholder="Keymap"
                    label="Keymap"
                    form={form}
                    name="keymap"
                    items={keymapOptions}
                    classes={{
                        selectTrigger: "w-full",
                    }}
                />
                <GeneralSlider
                    form={form}
                    name="previewDebounce"
                    label={
                        <div className="flex flex-row justify-between items-center gap-4 w-full">
                            <div>Preview Refresh Timeout</div>
                            <div>{form.watch("previewDebounce")} seconds</div>
                        </div>
                    }
                    desc="This is the time the split-view editor preview will wait after each change to the input before re-rendering."
                    sliderProps={{
                        min: 0,
                        max: 10,
                        step: 0.1,
                    }}
                />
                <H3>Jupyter</H3>
                <div className="@[768px]/settings:grid @[768px]/settings:grid-cols-2 gap-x-4 gap-y-6 flex flex-col justify-start items-start">
                    <TextInputGroup label="Port" form={form} name="port" />
                    <TextInputGroup label="Kernel Name" form={form} name="kernel" />
                </div>
                <TextAreaInput
                    classes={{
                        container: "w-full max-w-full",
                        textArea: "w-full max-w-full",
                        formItem: "w-full max-w-full",
                    }}
                    rows={2}
                    label="Token"
                    form={form}
                    name="token"
                />
                <div className="flex flex-row justify-end items-center">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            generateToken();
                        }}
                    >
                        Generate new token
                    </Button>
                </div>
            </SettingPageContainer>
        </Form>
    );
});

CodeSettingsPage.displayName = "CodeSettingsPage";
