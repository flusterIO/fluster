import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import Editor, { OnMount } from "@monaco-editor/react";
import { useDarkMode } from "@/hooks/use_dark_mode";
import {
    BundledLanguage,
    BundledTheme,
    createHighlighter,
    HighlighterGeneric,
} from "shiki";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { applyNestedMathLsp } from "#/editor/data/apply_nested_math_lsp";
import { useKeymap } from "#/keymap/state/hooks/use_keymap";
import { KeymapId } from "#/keymap/data/models/keymap_ids";

export interface CodeEditorProps {
    value: string;
    onChange: (newVal: string) => void;
    language: string;
    themes: AppState["code"]["theme"];
    isModal: boolean;
}

const connector = connect((state: AppState) => ({
    themes: state.code.theme,
}));

const CodeEditor = connector(
    ({
        onChange,
        value,
        language,
        themes,
        isModal,
    }: CodeEditorProps): ReactNode => {
        const darkMode = useDarkMode();
        const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
        const commandPaletteKeyMap = useKeymap(KeymapId.editorCommandPalette);
        const [highlighter, setHighligher] = useState<HighlighterGeneric<
            BundledLanguage,
            BundledTheme
        > | null>(null);

        const getHighlighter = async (
            themeGroup: typeof themes,
            lang: typeof language
        ): Promise<void> => {
            const highlighter = await createHighlighter({
                themes: [themeGroup.dark, themeGroup.light],
                langs: [lang],
            });
            setHighligher(highlighter);
        };

        useEffect(() => {
            getHighlighter(themes, language);
        }, [themes, language]);

        if (!highlighter) {
            return null;
        }

        const handleEditorMount: OnMount = (editor, monaco): void => {
            applyNestedMathLsp(monaco);
            editorRef.current = editor;
            editorRef.current.focus();
            if (isModal) {
                editorRef.current.addAction({
                    // an unique identifier of the contributed action
                    id: "submit-monaco-modal",
                    // a label of the action that will be presented to the user
                    label: "Submit Monaco Modal",
                    keybindings: [
                        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
                    ],
                    // the method that will be executed when the action is triggered.
                    run: function () {
                        console.log(`Submitting modal data...`);
                        /* TODO: Handle closing of the modal here. */
                        /* opts.onAccept(editorState.getValue()); */
                    },
                });
            }

            if (commandPaletteKeyMap) {
                editorRef.current.addAction({
                    id: "cmd-palette",
                    label: "Open Editor Command Palette",
                    keybindings: commandPaletteKeyMap.toMonacoKeyMap(),
                    /* keybindings: [ */
                    /*     monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, */
                    /* ], */
                    run: (editorState) => {
                        const action = editorState.getAction("editor.action.quickCommand");
                        action?.run();
                    },
                });
            }
            shikiToMonaco(highlighter, monaco);
        };
        /* const [size, setSize] = useState<Size | null>(null); */
        /* const getSize = () => { }; */
        return (
            <div className="w-full h-full bg-background">
                <Editor
                    value={value}
                    height={"100%"}
                    language={language}
                    onMount={handleEditorMount}
                    theme={darkMode ? themes.dark : themes.light}
                    onChange={(val) => {
                        if (typeof val === "string") {
                            onChange(val);
                        }
                    }}
                />
            </div>
        );
    }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
