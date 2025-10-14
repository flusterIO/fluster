import { commands } from "@/lib/bindings";
import { AppState } from "@/state/initial_state";
import { showToast } from "@fluster.io/dev";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// RESUME: Come back here and handle this issue with the u8 array from rust returning an empty array.

export const useBinaryFileUrl = (filePath: string) => {
    const basePath = useSelector(
        (appState: AppState) => appState.core.notesDirectory
    );
    const [data, setData] = useState<string | null>(null);
    const getData = async (fp: string, bp: string): Promise<void> => {
        const res = await commands.loadBinaryFile(fp, bp);
        if (res.status === "ok") {
            const arrayBuffer = new Uint8Array(res.data);
            const blob = new Blob([arrayBuffer], {
                type: "application/octet-stream",
            });
            const objectUrl = URL.createObjectURL(blob);
            setData(objectUrl);
        } else {
            showToast({
                title: "Could not load file",
                body:
                    res.error === "FileDoesNotExist"
                        ? `The file at ${filePath} does not exist.`
                        : `Fluster ran into an error while attempting to load the file at ${filePath}`,
                duration: 5000,
                variant: "Error",
            });
        }
    };
    useEffect(() => {
        getData(filePath, basePath);
    }, [filePath, basePath]);
    return data;
};
