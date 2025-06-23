import React, { useEffect, useRef, useState, type ReactNode } from "react";
import SplitViewContainer from "./split_view_scaffold";
import { useSearchParams } from "react-router";
import { commands } from "@/lib/bindings";
import { useIsomorphicLayoutEffect } from "@/hooks/use_isomorphic_effect";
import { KeyCode, KeyMod } from "monaco-editor";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { save } from "@tauri-apps/plugin-dialog";

export interface EditNoteSplitViewSearchParams {
    fsPath: string;
}

const EditNoteSplitViewPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const valueRef = useRef(value);
    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    const getFileContent = async (fsPath: string): Promise<void> => {
        const res = await commands.readUtf8File(fsPath);
        if (res.status === "ok") {
            setValue(res.data);
        }
    };
    useIsomorphicLayoutEffect(() => {
        const fsPath = searchParams.get("fsPath");
        if (fsPath) {
            commands.setLastReadByFilePath(fsPath).catch((e) => {
                console.error(`An error occurred while setting last_read: ${e}`);
            });
            getFileContent(fsPath);
        }
    }, [searchParams]);
    return (
        <SplitViewContainer
            actions={[
                {
                    // an unique identifier of the contributed action
                    id: "save-file",
                    // a label of the action that will be presented to the user
                    label: "Save",
                    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
                    // the method that will be executed when the action is triggered.
                    run: async function () {
                        const fsPath = searchParams.get("fsPath");
                        if (!fsPath) {
                            const path = await save({
                                filters: [
                                    {
                                        name: "Mdx",
                                        extensions: ["mdx"],
                                    },
                                ],
                            });
                            if (typeof path === "string") {
                                searchParams.set("fsPath", path);
                            }
                        } else {
                            {
                                const res = await commands.saveUtf8File(
                                    fsPath,
                                    valueRef.current
                                );
                                if (res.status === "ok") {
                                    showToast({
                                        title: "Saved",
                                        body: "Your file was saved successfully.",
                                        duration: 3000,
                                        variant: "Success",
                                    });
                                } else {
                                    console.error(
                                        "An error occurred while attempting to save this file: ",
                                        res.error
                                    );
                                }
                            }
                        }
                    },
                },
            ]}
            language="mdx"
            value={value}
            onChange={setValue}
        />
    );
};

EditNoteSplitViewPage.displayName = "EditNoteSplitViewPage";

export default EditNoteSplitViewPage;
