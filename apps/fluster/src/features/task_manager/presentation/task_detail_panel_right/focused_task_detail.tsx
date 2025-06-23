import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { MdxContent } from "#/mdx/presentation/mdx_content";
import { TaskModel } from "@/lib/bindings";
import React, { type ReactNode } from "react";
import { NoTaskNoteBanner } from "./no_note_banner";
import { Button } from "@fluster.io/dev";

export const FocusedTaskDetail = ({
    data,
    handleCreateNote,
}: {
    data: TaskModel;
    handleCreateNote: () => Promise<void>;
}): ReactNode => {
    return (
        <div className="w-full h-full flex flex-col pt-8">
            <div className="text-foreground/80">Label:</div>
            <div className="scroll-m-20 text-2xl font-semibold tracking-tight ml-6">
                <InlineMdxContent mdx={data.label} />
            </div>
            {data.notes.trim().length ? (
                <>
                    <div className="text-foreground/80 mt-4">Notes:</div>
                    <div className="ml-6 h-full max-h-full overflow-y-auto">
                        <MdxContent mdx={data.notes} />
                    </div>
                    <div className="mt-4 w-full flex flex-row justify-end items-center">
                        <Button onClick={handleCreateNote}>Edit Note</Button>
                    </div>
                </>
            ) : (
                <NoTaskNoteBanner handleCreateNote={handleCreateNote} />
            )}
        </div>
    );
};

FocusedTaskDetail.displayName = "FocusedTaskDetail";
