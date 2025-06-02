import React, { useEffect, useState, type ReactNode } from "react";
import { codeToHtml } from "shiki";
import { cn } from "../../utils/cn";

export interface CodeBlockProps {
    code: string;
    lang: string;
    themes: {
        dark: string;
        light: string;
    };
    darkMode: boolean;
    className?: string;
}

export const CodeBlock = ({
    darkMode,
    className,
    ...props
}: CodeBlockProps): ReactNode => {
    const [parsedHtml, setParsedHtml] = useState("");
    const handleCodeParsing = async (
        code: string,
        lang: string,
        isDark: boolean,
        themes: typeof props.themes
    ): Promise<void> => {
        const html = await codeToHtml(code, {
            lang: lang,
            theme: isDark ? themes.dark : themes.light,
        });
        setParsedHtml(html);
    };
    useEffect(() => {
        handleCodeParsing(props.code, props.lang, darkMode, props.themes).catch(
            () => {
                console.error("Something went wrong while parsing a code block.");
            }
        );
    }, [props.lang, props.code, darkMode, props.themes]);
    return (
        <div className={cn("w-full overflow-x-auto", className)}>
            <div
                className="[&>pre]:p-3 [&>pre]:overflow-auto text-sm"
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
        </div>
    );
};

CodeBlock.displayName = "CodeBlock";
