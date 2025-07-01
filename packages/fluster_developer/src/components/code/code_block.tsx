import React, { useEffect, useState, type ReactNode } from "react";
import { codeToHtml } from "shiki";
import { cn } from "../../utils/cn";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
} from "../shad/context-menu";
import { showToast } from "../../utils/show_toast";

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

export const Code = (props: { parsedHtml: string; className?: string }) => {
    return (
        <div
            className={cn(
                "[&>pre]:p-3 [&>pre]:overflow-auto text-sm",
                props.className
            )}
            dangerouslySetInnerHTML={{ __html: props.parsedHtml }}
        />
    );
};

export const CodeBlock = (props: CodeBlockProps): ReactNode => {
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
        handleCodeParsing(
            props.code,
            props.lang,
            props.darkMode,
            props.themes
        ).catch(() => {
            console.error("Something went wrong while parsing a code block.");
        });
        /* eslint-disable-next-line  --  */
    }, [props.lang, props.code, props.darkMode, props.themes]);
    return (
        <div className={cn("w-full overflow-x-auto", props.className)}>
            <ContextMenu>
                <ContextMenuContent>
                    <ContextMenuGroup>
                        <ContextMenuLabel>Actions</ContextMenuLabel>
                        <ContextMenuItem
                            className="text-foreground"
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(props.code);
                                    showToast({
                                        title: "Success",
                                        body: `Your ${props.lang} code was copied to your clipboard.`,
                                        duration: 3000,
                                        variant: "Success",
                                    });
                                } catch (err) {
                                    console.error("Failed to copy: ", err);
                                    return false;
                                }
                            }}
                        >
                            Copy
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
                <ContextMenuTrigger asChild>
                    <Code parsedHtml={parsedHtml} />
                </ContextMenuTrigger>
            </ContextMenu>
        </div>
    );
};

CodeBlock.displayName = "CodeBlock";
