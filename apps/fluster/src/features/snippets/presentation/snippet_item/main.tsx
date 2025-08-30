import { commands, SnippetData } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import { Button, buttonVariants, CodeBlock, MdxH3 } from "@fluster.io/dev";
import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { reloadSnippetList } from "#/snippets/data/events/reload_snippet_list";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { motion } from "motion/react";
import store from "@/state/store";
import { setPanelLeftOpen } from "#/panel_left/state/slice";
import { NavLink } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";
import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/use_dark_mode";
import { connect } from "react-redux";
import { AppState } from "@/state/initial_state";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { TagBadge } from "#/search/presentation/utils/tag_badge";

const connector = connect((state: AppState) => ({
    themes: state.code.theme,
}));

interface SnippetItemComponentProps {
    item: SnippetData;
    idx: number;
    themes: AppState["code"]["theme"];
    preview?: boolean;
}

const SnippetListItem = connector(
    ({ item, idx, themes, preview }: SnippetItemComponentProps): ReactNode => {
        const confirmationId = `delete-snippet-${item.snippet.id}`;
        const darkMode = useDarkMode();
        const handleDelete = async (): Promise<void> => {
            if (item.snippet.id) {
                const res = await commands.deleteSnippetById(item.snippet.id);
                if (res.status === "ok") {
                    reloadSnippetList();
                }
            }
        };
        const confirm = useConfirmation(
            {
                id: confirmationId,
                acceptButtonText: "Delete",
                denyButtonText: "Cancel",
                title: "Are you sure?",
                body: "Deleting this snippet is irreversable.",
                confirmationVariant: "destructive",
            },
            () => {
                handleDelete().catch(() => {
                    showToast({
                        title: "Oh no",
                        body: "Something went wrong while deleting this snippet.",
                        variant: "Error",
                        duration: 5000,
                    });
                });
            }
        );

        const handleDeleteClick = (): void => {
            confirm.setVisible(true);
        };

        const handleCopyClick = async () => {
            const res = await copyStringToClipboard(item.snippet.body);
            if (res) {
                showToast({
                    title: "Success",
                    body: `Your ${item.snippet.lang} code has been copied to your clipboard.`,
                    duration: 5000,
                    variant: "Success",
                });
            }
        };

        const handleEditClick = (): void => {
            store.dispatch(setPanelLeftOpen(true));
        };

        return (
            <motion.div
                className="w-[min(90%,1080px)] h-fit px-6 pb-6 pt-4 border rounded @container/snippet_item"
                initial="initial"
                animate="show"
                transition={{
                    delay: idx * 0.1,
                }}
                variants={{
                    initial: {
                        x: idx % 2 === 0 ? -200 : 200,
                        opacity: 0,
                    },
                    show: {
                        x: 0,
                        opacity: 1,
                    },
                }}
            >
                <MdxH3
                    className=""
                    mdx={item.snippet.label}
                    InlineMdxContent={InlineMdxContent}
                />
                <div className="text-sm text-muted-foreground">{item.snippet.lang}</div>
                {item.snippet.desc && item.snippet.desc !== "" && (
                    <div className="mb-3 mt-2">
                        <InlineMdxContent mdx={item.snippet.desc} />
                    </div>
                )}
                {item.tags.length ? (
                    <div className="w-full flex flex-row justfy-start items-center gap-2 flex-wrap mb-4">
                        {item.tags.map((t) => {
                            return <TagBadge tagValue={t.tag_value} />;
                        })}
                    </div>
                ) : null}
                <CodeBlock
                    darkMode={darkMode}
                    lang={item.snippet.lang}
                    code={item.snippet.body}
                    themes={themes}
                />
                <div className="w-full flex flex-col justify-between items-center gap-4 @[300px]/snippet_item:gap-6 @[300px]/snippet_item:flex-row mt-4">
                    <Button
                        className="w-full @[300px]/snippet_item:w-fit"
                        variant={"destructive"}
                        onClick={handleDeleteClick}
                        disabled={preview}
                    >
                        Delete
                    </Button>
                    <div className="flex flex-col justify-end items-center gap-4 w-full @[300px]/snippet_item:flex-row">
                        <NavLink
                            className={cn(
                                "w-full @[300px]/snippet_item:w-fit",
                                buttonVariants({
                                    variant: "outline",
                                }),
                                preview && "hidden"
                            )}
                            onClick={preview ? undefined : handleEditClick}
                            to={`${AppRoutes.snippets}?editing=${item.id}`}
                        >
                            Edit
                        </NavLink>
                        <Button
                            className="w-full @[300px]/snippet_item:w-fit"
                            onClick={() => handleCopyClick()}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }
);

SnippetListItem.displayName = "SnippetListItem";

export default SnippetListItem;
