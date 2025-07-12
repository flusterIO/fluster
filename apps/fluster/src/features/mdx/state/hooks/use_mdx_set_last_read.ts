import { commands } from "@/lib/bindings";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const useMdxNoteSetLastRead = () => {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const fsPath = searchParams.get("fsPath");
        if (fsPath && fsPath.length) {
            commands.setLastReadByFilePath(fsPath).catch((e) => {
                console.error(`An error occurred while setting last_read: ${e}`);
            });
        }
    }, [searchParams]);
}
