import React, { HTMLProps, type ReactNode } from "react";
import { MdxContent } from "./mdx_content";
import { cn, useEventListener } from "@fluster.io/dev";
import { MdxNoteGroup } from "@/lib/bindings";
import { useNavigate } from "react-router";
import { AppRoutes } from "#/router/data/app_routes";

export interface MdxNotePageSearchParams {
    /** The absolute path to the note on the user's computer. If this is provided, the content will be loaded directly from the file system, by passing the database except when strictly required. */
    fsPath?: string;
    /** The id of the note. When this is provided, a note will be loaded from the database, and an error will be displayed if that note is not found. */
    noteId?: string;
}

type MdxNotePageProps = HTMLProps<HTMLDivElement> & { mdxGroup: MdxNoteGroup };

const MdxNotePage = ({ mdxGroup, ...props }: MdxNotePageProps): ReactNode => {
    const nav = useNavigate();
    useEventListener("view-note-split-view", () => {
        const sp = new URLSearchParams();
        sp.set("fsPath", mdxGroup.mdx.file_path);
        nav(`${AppRoutes.splitViewEditMdx}?${sp.toString()}`);
    });
    return (
        <div
            {...props}
            className={cn(
                "w-full min-h-screen overflow flex flex-col justify-start items-center py-12 px-6 md:px-8 overflow-y-auto",
                props.className
            )}
        >
            <div className="w-[min(1080px,90%)]">
                <MdxContent mdx={mdxGroup.mdx.raw_body} />
            </div>
        </div>
    );
};

MdxNotePage.displayName = "MdxNotePage";

export default MdxNotePage;
