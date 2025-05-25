import { useRef, type ReactNode } from "react";
import Editor from "@monaco-editor/react";

export interface CodeEditorProps {
    value: string;
    onChange: (newVal: string) => void;
    defaultLang: string;
}

const handleEditorChange = (): void => { };
const handleEditorMount = (): void => { };

const CodeEditor = ({
    onChange,
    value,
    defaultLang,
}: CodeEditorProps): ReactNode => {
    const container = useRef<HTMLDivElement>(null!);
    /* const [size, setSize] = useState<Size | null>(null); */
    /* const getSize = () => { }; */
    return (
        <div className="w-full h-full" ref={container}>
            <Editor
                height={"90vh"}
                defaultLanguage={defaultLang}
                defaultValue={value}
                onMount={handleEditorMount}
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
