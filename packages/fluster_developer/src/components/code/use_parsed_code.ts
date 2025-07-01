import { codeToHtml } from "shiki";
import { CodeBlockProps } from "./code_block";
import { useEffect, useState } from "react";

export const useParsedCode = (props: CodeBlockProps) => {
    const [parsedHtml, setParsedHtml] = useState<string>("");
    const [data, setData] = useState(props);
    const handleCodeParsing = async (data: CodeBlockProps): Promise<void> => {
        const html = await codeToHtml(data.code, {
            lang: data.lang,
            theme: data.darkMode ? data.themes.dark : data.themes.light,
        });
        setParsedHtml(html);
    };

    useEffect(() => {
        handleCodeParsing(data);
    }, [data]);

    useEffect(() => {
        handleCodeParsing(props).catch(() => {
            console.error("Something went wrong while parsing a code block.");
        });
    }, [props]);
    return [parsedHtml, setData] as [string, (props: CodeBlockProps) => void];
};
