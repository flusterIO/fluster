import { commands } from "@/lib/bindings";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

export interface MdxNotePageSearchParams {
    /** The absolute path to the note on the user's computer. If this is provided, the content will be loaded directly from the file system, by passing the database except when strictly required. */
    fsPath?: string;
    /** The id of the note. When this is provided, a note will be loaded from the database, and an error will be displayed if that note is not found. */
    noteId?: string;
}

interface MdxNotePageProps { }

const MdxNotePage = (props: MdxNotePageProps): ReactNode => {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState("");

    const getNoteContentFromFs = async (fsPath: string): Promise<void> => {
        /* commands. */
    };

    const getNoteContentById = async (noteId: number): Promise<void> => { };

    useEffect(() => {
        let fsPath = searchParams.get("fsPath");
        if (fsPath && fsPath.length) {
            getNoteContentFromFs(fsPath);
        } else {
            let noteId = searchParams.get("noteId");
            if (noteId && noteId.length) {
                getNoteContentById(parseInt(noteId));
            }
        }
    }, [searchParams]);
    return <div></div>;
};

MdxNotePage.displayName = "MdxNotePage";

export default MdxNotePage;
