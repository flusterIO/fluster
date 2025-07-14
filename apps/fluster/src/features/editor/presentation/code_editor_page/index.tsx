import React, { useEffect, useRef, type ReactNode } from "react";
import CodeEditor from "../code_editor/main";
import { KeyCode, KeyMod } from "monaco-editor";
import { showToast, useLocalStorage } from "@fluster.io/dev";
import { useSearchParams } from "react-router";
import { save } from "@tauri-apps/plugin-dialog";
import { commands } from "@/lib/bindings";

export const CodeEditorPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useLocalStorage(
        searchParams.has("fsPath")
            ? "split-view-file-editor"
            : "split-view-new-file-editor"
    ) as [string, (newString: string) => void];
    const valueRef = useRef(value);
    const lang = searchParams.get("lang") ?? "mdx";
    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    return (
        <CodeEditor
            language={lang}
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
            value={value}
            onChange={setValue}
        />
    );
};

CodeEditorPage.displayName = "CodeEditorPage";
