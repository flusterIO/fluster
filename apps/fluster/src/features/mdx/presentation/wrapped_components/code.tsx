import { useDarkMode } from "@/hooks/use_dark_mode";
import {
    Code,
    CodeBlock,
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuTrigger,
    showToast,
} from "@fluster.io/dev";
import React, { HTMLProps, useRef, type ReactNode } from "react";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";

const connector = connect((state: AppState) => ({
    themes: state.code.theme,
    defaultLang: state.code.defaultLanguage,
}));

interface WrappedCodeBlockProps extends HTMLProps<HTMLElement> {
    code: string;
    defaultLanguage: AppState["code"]["defaultLanguage"];
    themes: AppState["code"]["theme"];
}

export const WrappedCodeBlock = connector(
    ({ themes, defaultLanguage, ...props }: WrappedCodeBlockProps): ReactNode => {
        console.log("props: ", props);
        const ref = useRef<HTMLDivElement>(null);
        /* const darkMode = useDarkMode(); */
        /* console.log("children: ", children); */
        return (
            <ContextMenu>
                <ContextMenuContent>
                    <ContextMenuGroup>
                        <ContextMenuLabel>Actions</ContextMenuLabel>
                        <ContextMenuItem
                            className="text-foreground"
                            onClick={async () => {
                                const content = ref.current?.innerText;
                                if (!content?.length) {
                                    console.error("Could not copy code.");
                                } else {
                                    const res = await copyStringToClipboard(content);
                                    if (res) {
                                        showToast({
                                            title: "Success",
                                            body: `Your ${props["data-language"]} code was copied to your clipboard.`,
                                            duration: 3000,
                                            variant: "Success",
                                        });
                                    }
                                }
                            }}
                        >
                            Copy
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
                <ContextMenuTrigger>
                    <code {...props} ref={ref} />
                </ContextMenuTrigger>
            </ContextMenu>
        );
    }
);

WrappedCodeBlock.displayName = "WrappedCodeBlock";
