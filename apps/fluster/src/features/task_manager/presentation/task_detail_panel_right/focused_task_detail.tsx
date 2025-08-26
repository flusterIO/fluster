import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { TaskModelWithTags } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import { NoTaskNoteBanner } from "./no_note_banner";
import { AppRoutes, Badge, Button } from "@fluster.io/dev";
import { useNavigate } from "react-router";

export const FocusedTaskDetail = ({
    data,
    handleCreateNote,
}: {
    data: TaskModelWithTags;
    handleCreateNote: () => Promise<void>;
}): ReactNode => {
    const nav = useNavigate();
    return (
        <div className="w-full h-full flex flex-col pt-8">
            <div className="text-foreground/80">Label:</div>
            <div className="scroll-m-20 text-2xl font-semibold tracking-tight ml-6">
                <InlineMdxContent mdx={data.label} />
            </div>
            {data.tags.length > 0 ? (
                <>
                    <div className="text-foreground/80 mb-2">Tags:</div>
                    <div className="scroll-m-20 text-2xl font-semibold tracking-tight ml-6 w-full flex flex-row flex-wrap justify-start items-center gap-2">
                        {data.tags.map((t) => {
                            return (
                                <Badge
                                    className="cursor-pointer"
                                    onClick={() => {
                                        const sp = new URLSearchParams();
                                        sp.set("by_tag", t.value);
                                        nav(`${AppRoutes.search}?${sp.toString()}`);
                                    }}
                                >
                                    {t.value}
                                </Badge>
                            );
                        })}
                    </div>
                </>
            ) : null}
            {data.notes.trim().length ? (
                <>
                    <div className="text-foreground/80 mt-4">Notes:</div>
                    <div className="task-details-panel ml-6 h-full max-h-full overflow-y-auto">
                        <MdxContent mdx={data.notes} />
                    </div>
                    <div className="mt-4 w-full flex flex-row justify-end items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.dispatchEvent(
                                    new CustomEvent("show-set-due-at-modal", {
                                        detail: {
                                            id: data.id,
                                        },
                                    })
                                );
                            }}
                        >
                            Set deadline
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCreateNote();
                            }}
                        >
                            Edit Note
                        </Button>
                    </div>
                </>
            ) : (
                <NoTaskNoteBanner handleCreateNote={handleCreateNote} />
            )}
        </div>
    );
};

FocusedTaskDetail.displayName = "FocusedTaskDetail";
