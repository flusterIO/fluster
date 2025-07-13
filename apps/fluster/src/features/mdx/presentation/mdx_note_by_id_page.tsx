import { showToast } from "#/toast_notification/data/events/show_toast";
import React, { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import MdxNotePage from "./mdx_note_page";
import { commands, MdxNoteGroup } from "@/lib/bindings";
import { LoadingComponent } from "@/components/loading_screen";
import { MdxProviderGroup } from "./mdx_provider_group";
import { useMdxNoteSetLastRead } from "../state/hooks/use_mdx_set_last_read";

const MdxNoteByFilePathPage = (): ReactNode => {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState<null | MdxNoteGroup>(null);
    const readFromFileSystem = async (fsPath: string): Promise<void> => {
        const res = await commands.readMdxFile(fsPath);
        if (res.status === "ok") {
            setContent(res.data);
        }
    };

    useMdxNoteSetLastRead();

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
    return (
        <MdxProviderGroup>
            <MdxNotePage mdxGroup={content} />
        </MdxProviderGroup>
    );
};

MdxNoteByFilePathPage.displayName = "MdxNoteByIdPage";

export default MdxNoteByFilePathPage;
