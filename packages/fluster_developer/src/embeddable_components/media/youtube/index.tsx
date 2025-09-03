import React, { useRef, type ReactNode } from "react";
import { PositionableProps } from "../../types";
import { getPositionableClasses } from "../../util/get_positional_classes";
import YouTubePlayer, {
    YouTubeProps,
    YouTubePlayer as YtP,
} from "react-youtube";
import { cn } from "../../../utils/cn";
import { H4 } from "../../../components/typography/typography";
import { useEventListener } from "../../../hooks/use_event_listener";
import { getTimestampSourceId } from "../../util/timestamp_utils/get_timestamp_source_id";

interface YoutubeProps extends PositionableProps {
    /** Video id taken from video url. */
    video?: string;
    /** The url to the video. This will automatically parse the video string from the url if one exists.*/
    url?: string;
    title?: ReactNode;
    desc?: ReactNode;
    id?: string;
}

const parseVideoId = (url: string): string | undefined => {
    return new URL(url).searchParams.get("v") ?? undefined;
};

export const Youtube = ({
    video,
    url,
    title,
    desc,
    id,
    ...props
}: YoutubeProps): ReactNode => {
    const player = useRef<YouTubePlayer>(null!);
    useEventListener("video-time-seek-req", (e) => {
        console.log("e: ", e);
        if (id && e.detail.videoId === getTimestampSourceId("video", id)) {
            /* player.current. */
            console.log("player.current: ", player.current);
            /* player.current.context */
        }
    });
    return (
        <div
            className={cn(
                getPositionableClasses(props),
                "flex flex-col justify-center items-start",
                props.center && "items-center"
            )}
        >
            {title ? <H4 className="w-fit">{title}</H4> : null}
            <YouTubePlayer
                id={id}
                ref={player}
                videoId={url ? parseVideoId(url) : video}
                loading="lazy"
                title={typeof title === "string" ? title : undefined}
                className={cn("max-w-full w-fit", props.center && "ml-auto mr-auto")}
                iframeClassName="max-w-full max-h-[min(90vh,540px)]"
                onReady={(e) => {
                    console.log("on Ready e: ", e);
                }}
            />
            {desc ? (
                <div
                    className={cn(
                        "text-sm text-muted-foreground mt-2 max-w-[min(100%,540px)] w-fit",
                        props.center && "text-center"
                    )}
                >
                    {desc}
                </div>
            ) : null}
        </div>
    );
};

Youtube.displayName = "Youtube";
