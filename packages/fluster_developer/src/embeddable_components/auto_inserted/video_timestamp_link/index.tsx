import React, { type ReactNode } from "react";
import { useParsedTimestampString } from "../../util/timestamp_utils/use_parsed_timestamp_string";
import { getTimestampSourceId } from "../../util/timestamp_utils/get_timestamp_source_id";

interface VideoTimeSeekRequestProps {
    videoId: string;
    seconds: number;
}

declare global {
    interface WindowEventMap {
        "video-time-seek-req": CustomEvent<VideoTimeSeekRequestProps>;
    }
}

interface VideoTimestampLinkProps {
    id: string;
    timestamp: string;
    children: ReactNode;
}

export const VideoTimestampLink = ({
    id,
    timestamp: timestampString,
    children,
}: VideoTimestampLinkProps): ReactNode => {
    const timestamp = useParsedTimestampString(timestampString);
    const handleClick = (): void => {
        if (!timestamp) {
            return;
        }
        const _id = getTimestampSourceId("video", id);
        if (!_id) {
            return;
        }
        const em = document.getElementById(_id) as HTMLVideoElement | null;
        window.dispatchEvent(
            new CustomEvent("video-time-seek-req", {
                detail: {
                    videoId: _id,
                    seconds:
                        timestamp.hours * 3600 + timestamp.minutes * 60 + timestamp.seconds,
                },
            })
        );
        if (!em) {
            return;
        }
        em.currentTime =
            timestamp.hours * 3600 + timestamp.minutes * 60 + timestamp.seconds;
    };
    return (
        <a onClick={handleClick} role="button">
            {children}
        </a>
    );
};

VideoTimestampLink.displayName = "VideoTimestampLink";
