import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuTrigger,
    showToast,
} from "@fluster.io/dev";
import React, { HTMLProps, useRef, type ReactNode } from "react";
import { AppState } from "@/state/initial_state";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { BundledLanguage } from "shiki";

interface WrappedCodeBlockProps extends HTMLProps<HTMLPreElement> {
    code: string;
    defaultLanguage: AppState["code"]["defaultLanguage"];
    themes: AppState["code"]["theme"];
    "data-language": BundledLanguage;
}

export const WrappedCodeBlock = ({
    ...props
}: WrappedCodeBlockProps): ReactNode => {
    const ref = useRef<HTMLPreElement>(null);

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
                <pre
                    {...props}
                    className="mdx-code overflow-auto text-sm !bg-[var(--shiki-light-bg)] dark:!bg-[var(--shiki-dark-bg)] [&_code]:bg-transparent mt-2 border"
                    ref={ref}
                />
            </ContextMenuTrigger>
        </ContextMenu>
    );
};

WrappedCodeBlock.displayName = "WrappedCodeBlock";
