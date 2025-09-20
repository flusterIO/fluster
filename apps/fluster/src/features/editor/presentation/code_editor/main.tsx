import React, {
    useEffect,
    useId,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import Editor, { OnMount, loader } from "@monaco-editor/react";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { initVimMode } from "monaco-vim";
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
import { LoadingComponent } from "@/components/loading_screen";
import { editor } from "monaco-editor";
import * as monaco from "monaco-editor";
export type EditorOptions = editor.IStandaloneEditorConstructionOptions;
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { EditorAction } from "#/editor/data/types";
import { cn } from "@fluster.io/dev";

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

loader.config({ monaco });
/* loader.init().then(() => console.log("Monaco loader initialized")); */

export interface CodeEditorProps {
    value: string;
    onChange: (newVal: string) => void;
    language: string;
    themes: AppState["code"]["theme"];
    onCmdEnter?: () => void;
    actions?: EditorAction[];
    disabled?: boolean;
    vimMode: boolean;
    classes?: {
        container?: string;
        editor?: string;
    };
}

const connector = connect((state: AppState) => ({
    themes: state.code.theme,
    vimMode: state.code.keymap === "vim",
}));

const universalOpts: EditorOptions = {
    wordWrap: "on",
    inlineSuggest: {
        /* showToolbar: "always", */
        /* enabled: true, */
    },
    minimap: {
        enabled: false,
    },
    inlayHints: {
        fontSize: 10,
    },
    suggest: {
        shareSuggestSelections: true,
        selectionMode: "whenQuickSuggestion",
    },
    acceptSuggestionOnEnter: "smart",
    acceptSuggestionOnCommitCharacter: false,
    tabCompletion: "on",
};

const CodeEditor = connector(
    ({
        onChange,
        value,
        language,
        themes,
        vimMode,
        onCmdEnter,
        disabled,
        actions = [],
        classes = {},
    }: CodeEditorProps): ReactNode => {
        const darkMode = useDarkMode();
        const editorModeBarId = useId();
        const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
        const vimModeRef = useRef<{ dispose: () => void } | null>(null);
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
            /* eslint-disable-next-line  --  */
        }, [themes, language]);

        useEffect(() => {
            if (!vimMode && vimModeRef.current) {
                vimModeRef.current.dispose();
            }
        }, [vimMode]);

        if (!highlighter) {
            return null;
        }

        const handleEditorMount: OnMount = (editor, monaco): void => {
            applyNestedMathLsp(monaco);
            editorRef.current = editor;
            editorRef.current.focus();
            if (onCmdEnter) {
                editorRef.current.addAction({
                    // an unique identifier of the contributed action
                    id: "submit-monaco-input",
                    // a label of the action that will be presented to the user
                    label: "Submit",
                    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
                    // the method that will be executed when the action is triggered.
                    run: function () {
                        onCmdEnter();
                    },
                });
            }

            if (commandPaletteKeyMap) {
                editorRef.current.addAction({
                    id: "cmd-palette",
                    label: "Open Editor Command Palette",
                    keybindings: commandPaletteKeyMap.toMonacoKeyMap(),
                    run: (editorState) => {
                        const action = editorState.getAction("editor.action.quickCommand");
                        action?.run();
                    },
                });
            }

            for (const action of actions) {
                editorRef.current.addAction(action);
            }

            shikiToMonaco(highlighter, monaco);
            if (vimMode) {
                const _vimMode = initVimMode(
                    editor,
                    // An element that doesn't exist so to not create a mode bar. A mode bar might be nice in a future version, but for now the change in the cursor is enough.
                    document.getElementById(editorModeBarId)
                );
                vimModeRef.current = _vimMode;
                editorRef.current.updateOptions({ lineNumbers: "relative" });
            } else {
                editorRef.current.updateOptions({ lineNumbers: "on" });
            }
        };
        return (
            <div className={cn("w-full h-full bg-background", classes.container)}>
                <Editor
                    value={value}
                    height={"100%"}
                    language={language}
                    onMount={handleEditorMount}
                    theme={darkMode ? themes.dark : themes.light}
                    loading={<LoadingComponent />}
                    options={universalOpts}
                    className={classes.editor}
                    onChange={(val) => {
                        if (!disabled && typeof val === "string") {
                            onChange(val);
                        }
                    }}
                />
                {/* <div id={editorModeBarId} /> */}
            </div>
        );
    }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
