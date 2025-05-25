import { useEffect, useRef, useState, type ReactNode } from "react";
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

export interface CodeEditorProps {
  value: string;
  onChange: (newVal: string) => void;
  language: string;
  themes: AppState["code"]["theme"];
}

const connector = connect((state: AppState, props: any) => ({
  themes: state.code.theme,
  props: props,
}));

const handleEditorChange = (): void => {};

const CodeEditor = connector(
  ({ onChange, value, language, themes }: CodeEditorProps): ReactNode => {
    const darkMode = useDarkMode();
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
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
      editorRef.current = editor;
      editorRef.current.focus();

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
            if (val) {
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
