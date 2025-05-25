import { useRef, type ReactNode } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useDarkMode } from "@/hooks/use_dark_mode";

export interface CodeEditorProps {
    value: string;
    onChange: (newVal: string) => void;
    language: string;
}

const handleEditorChange = (): void => { };

const CodeEditor = ({
    onChange,
    value,
    language,
}: CodeEditorProps): ReactNode => {
    const container = useRef<HTMLDivElement>(null!);
    const darkMode = useDarkMode();
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

    const handleEditorMount: OnMount = (editor, monaco): void => {
        editorRef.current = editor;
        editorRef.current.focus();
    };
    /* const [size, setSize] = useState<Size | null>(null); */
    /* const getSize = () => { }; */
    return (
        <div className="w-full h-full bg-background" ref={container}>
            <Editor
                value={value}
                height={"100%"}
                language={language}
                onMount={handleEditorMount}
                theme={darkMode ? "vs-dark" : "github-light"}
                onChange={(val) => {
                    if (val) {
                        onChange(val);
                    }
                }}
            />
        </div>
    );
};

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
