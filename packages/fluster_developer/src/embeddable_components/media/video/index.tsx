import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { commands } from "../../../lib/bindings";
import { } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { cn } from "../../../utils/cn";
import { PositionableProps } from "../../types";
import { getPositionableClasses } from "../../util/get_positional_classes";
import { getTimestampSourceId } from "../../util/timestamp_utils/get_timestamp_source_id";

export interface VideoProps extends PositionableProps {
    file?: string;
    /** The user's note directory. */
    basePath: string;
    id?: string;
}

const NoFileProvided = (): ReactNode => {
    return (
        <div className="p-4 border text-red-500 dark:text-red-400">
            {"The Video component requires a 'file' property."}
        </div>
    );
};

const VideoComponent = ({
    fsPath,
    className,
    id,
}: {
    fsPath: string;
    className: string;
    id?: string;
}): ReactNode => {
    const [data, setData] = useState<null | string>(null);
    useEffect(() => {
        setData(convertFileSrc(fsPath));
    }, [fsPath]);
    if (data === null) {
        return null;
    }
    return (
        <video
            id={getTimestampSourceId("video", id)}
            controls
            src={data}
            className={className}
        />
    );
};

export const Video = ({
    file,
    basePath,
    id,
    ...props
}: VideoProps): ReactNode => {
    const [fullPath, setFullPath] = useState<string | null>(null);
    const positionableClasses = useMemo(
        () => getPositionableClasses(props),
        [props]
    );
    console.log("positionableClasses: ", positionableClasses);
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
    return (
        <VideoComponent
            id={id}
            className={cn("", positionableClasses)}
            fsPath={fullPath}
        />
    );
};

Video.displayName = "Video";
