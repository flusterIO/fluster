import { showToast } from "#/toast_notification/data/events/show_toast";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import MdxNotePage from "./mdx_note_page";
import { commands, MdxNoteGroup } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";

const MdxNoteByFilePathPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState<null | MdxNoteGroup>(null);
    const readFromFileSystem = async (fsPath: string): Promise<void> => {
        // RESUME: Create a new 'readMdxFile' command that returns the front matter and parsed note directly from the file system. Right now the front matter yaml is just being embedded in the note.
        // RESUME: Fix scroll issue.
        const res = await commands.readMdxFile(fsPath);
        if (res.status === "ok") {
            setContent(res.data);
        }
    };

    useEffect(() => {
        const fsPath = searchParams.get("fsPath");
        if (fsPath && fsPath.length) {
            readFromFileSystem(fsPath).catch(() => {
                showToast({
                    title: "Oh no",
                    body: "An error occurred while gathering your content.",
                    duration: 5000,
                    variant: "Error",
                });
            });
        }
    }, [searchParams]);

    if (content === null) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <LoadingComponent />
            </div>
        );
    }

    return <MdxNotePage mdxGroup={content} />;
};

MdxNoteByFilePathPage.displayName = "MdxNoteByIdPage";

export default MdxNoteByFilePathPage;
