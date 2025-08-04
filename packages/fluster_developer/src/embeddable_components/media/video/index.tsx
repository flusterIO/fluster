import React, { useEffect, useState, type ReactNode } from "react";
import { commands } from "../../../lib/bindings";
import { } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";

export interface VideoProps {
    file?: string;
    /** The user's note directory. */
    basePath: string;
}

const NoFileProvided = (): ReactNode => {
    return (
        <div className="p-4 border text-red-500 dark:text-red-400">
            {"The Video component requires a 'file' property."}
        </div>
    );
};

const VideoComponent = ({ fsPath }: { fsPath: string }): ReactNode => {
    const [data, setData] = useState<null | string>(null);
    useEffect(() => {
        setData(convertFileSrc(fsPath));
    }, [fsPath]);
    if (data === null) {
        return null;
    }
    return <video controls src={data} />;
};

export const Video = ({ file, basePath }: VideoProps): ReactNode => {
    const [fullPath, setFullPath] = useState<string | null>(null);
    const parsePath = async (fp: string, bp: string): Promise<void> => {
        const parsedPath = await commands.normalizePath(fp, bp);
        console.log("parsedPath: ", parsedPath);
        setFullPath(parsedPath);
    };
    useEffect(() => {
        if (file) {
            parsePath(file, basePath);
        }
    }, [file, basePath]);
    if (!file) {
        return <NoFileProvided />;
    }
    if (!fullPath) {
        return null;
    }
    return <VideoComponent fsPath={fullPath} />;
};

Video.displayName = "Video";
