import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { MediaPlayerProps } from "../../types";
import { commands } from "../../../lib/bindings";
import { cn } from "../../../utils/cn";
import { getPositionableClasses } from "../../util/get_positional_classes";
import { NoFileProvided } from "../video";
import AudioPlayer from "react-h5-audio-player";
import { useEventListener } from "../../../hooks/use_event_listener";
import { getTimestampSourceId } from "../../util/timestamp_utils/get_timestamp_source_id";
import { convertFileSrc } from "@tauri-apps/api/core";

interface AudioSeekToSecondsProps {
    id: string;
    seconds: number;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface WindowEventMap {
        "audio-seek-to-seconds": CustomEvent<AudioSeekToSecondsProps>;
    }
}

const AudioComponent = ({
    fsPath,
    className,
    id,
    autoPlay,
}: {
    fsPath: string;
    className?: string;
    id?: string;
    autoPlay?: boolean;
}): ReactNode => {
    const [data, setData] = useState<null | string>(null);
    useEffect(() => {
        setData(convertFileSrc(fsPath));
    }, [fsPath]);
    const ref = useRef<AudioPlayer>(null!);
    useEventListener("audio-seek-to-seconds", (e) => {
        let _id = getTimestampSourceId("audio", id);
        if (e.detail.id === _id) {
            ref.current.audio.current.currentTime = e.detail.seconds;
        }
    });
    if (data === null) {
        return null;
    }
    return <AudioPlayer className={className} autoPlay={autoPlay} ref={ref} />;
};

export const Audio = ({
    file,
    basePath,
    id,
    ...props
}: MediaPlayerProps): ReactNode => {
    const [fullPath, setFullPath] = useState<string | null>(null);
    const positionableClasses = useMemo(
        () => getPositionableClasses(props),
        [props]
    );
    const parsePath = async (fp: string, bp: string): Promise<void> => {
        const parsedPath = await commands.normalizePath(fp, bp);
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
        <AudioComponent
            id={id}
            className={cn("!bg-card [&_svg_path]:!fill-primary", positionableClasses)}
            fsPath={fullPath}
        />
    );
};

Audio.displayName = "Audio";
