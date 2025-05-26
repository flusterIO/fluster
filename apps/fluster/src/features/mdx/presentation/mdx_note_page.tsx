import { showToast } from "#/toast_notification/data/events/show_toast";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import MdxContent from "./mdx_content";

export interface MdxNotePageSearchParams {
    /** The absolute path to the note on the user's computer. If this is provided, the content will be loaded directly from the file system, by passing the database except when strictly required. */
    fsPath?: string;
    /** The id of the note. When this is provided, a note will be loaded from the database, and an error will be displayed if that note is not found. */
    noteId?: string;
}

const MdxNotePage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState("");

    const getNoteContentFromFs = async (fsPath: string): Promise<void> => {
        console.log("fsPath: ", fsPath);
        throw Error("Not implemented");
    };

    const getNoteContentById = async (noteId: number): Promise<void> => {
        console.log("noteId: ", noteId);
        throw Error("Not implemented");
    };

    useEffect(() => {
        const fsPath = searchParams.get("fsPath");
        if (fsPath && fsPath.length) {
            getNoteContentFromFs(fsPath).catch(() => {
                showToast({
                    title: "Oh no",
                    body: "An error occurred while gathering your content.",
                    duration: 5000,
                    variant: "Error",
                });
            });
        } else {
            const noteId = searchParams.get("noteId");
            if (noteId && noteId.length) {
                getNoteContentById(parseInt(noteId)).catch(() => {
                    showToast({
                        title: "Oh no",
                        body: "An error occurred while gathering your content.",
                        duration: 5000,
                        variant: "Error",
                    });
                });
            }
        }
    }, [searchParams]);
    return <div>{content.length && <MdxContent mdx={content} />}</div>;
};

MdxNotePage.displayName = "MdxNotePage";

export default MdxNotePage;
