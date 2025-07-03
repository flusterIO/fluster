import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { shikiToMonaco } from "@shikijs/monaco";
import Editor, { OnMount, loader } from "@monaco-editor/react";
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
}

const connector = connect((state: AppState) => ({
  themes: state.code.theme,
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
    onCmdEnter,
    disabled,
    actions = [],
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
      /* eslint-disable-next-line  --  */
    }, [themes, language]);

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

      /* WITH_WIFI: Review docs here and rework this to import directly from node_modules or at least from the public directory. Should be pretty easy and add offline functionality. */
      /*     https://github.com/brijeshb42/monaco-vim */

      /* window.require.config({ */
      /*     paths: { */
      /*         "monaco-vim": "/monaco/monaco-vim.js", */
      /*     }, */
      /* }); */
      /* let vm: { dispose: () => void } | null = null; */
      /* window.require(["monaco-vim"], function (MonacoVim) { */
      /*     /* ADD_CONFIG_OPTION: Add ability to set vim mode both from the appConfig and from a search param. Add a config field for key maps if they choose to use vim. */
      /*     MonacoVim.VimMode.Vim.map("jj", "<Esc>", "insert"); */
      /*     const statusNode = document.getElementById(opts.statusBarId); */
      /*     const vimMode = MonacoVim.initVimMode(_editor, statusNode); */
      /*     vm = vimMode; */
      /*     window.vimMode = vimMode; */
      /*     window.editor = _editor; */
      /*     _editor.focus(); */
      /* }); */
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
          loading={<LoadingComponent />}
          options={universalOpts}
          onChange={(val) => {
            if (!disabled && typeof val === "string") {
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
