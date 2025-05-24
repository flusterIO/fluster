import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { codeToHtml, createHighlighter } from "shiki";

interface CodeBlockProps {
    code: string;
    lang: string;
}

const CodeBlock = (props: CodeBlockProps): ReactNode => {
    const [parsedHtml, setParsedHtml] = useState("");
    const handleCodeParsing = async (
        code: string,
        lang: string
    ): Promise<void> => {
        const html = await codeToHtml(code, {
            lang: "javascript",
            theme: "dracula",
        });
        setParsedHtml(html);
    };
    useEffect(() => {
        handleCodeParsing(props.code, props.lang);
    }, [props.lang, props.code]);
    return (
        <div className="w-full overflow-x-auto">
            <div
                className="[&>pre]:p-3 text-sm"
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
        </div>
    );
};

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
