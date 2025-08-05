import React, { type ReactNode } from "react";
import { useParsedTimestampString } from "../../util/timestamp_utils/use_parsed_timestamp_string";
import { getTimestampSourceId } from "../../util/timestamp_utils/get_timestamp_source_id";
import { sendAudioSeekRequest } from "../../media/audio/send_audio_seek_event";

interface AudioTimestampLinkProps {
    id: string;
    timestamp: string;
    children: ReactNode;
}

export const AudioTimestampLink = ({
    id,
    timestamp: timestampString,
    children,
}: AudioTimestampLinkProps): ReactNode => {
    const timestamp = useParsedTimestampString(timestampString);
    const handleClick = (): void => {
        if (!timestamp) {
            return;
        }
        const _id = getTimestampSourceId("audio", id);
        if (!_id) {
            return;
        }
        sendAudioSeekRequest(
            _id,
            timestamp.hours * 3600 + timestamp.minutes * 60 + timestamp.seconds
        );
    };
    return (
        <a onClick={handleClick} role="button">
            {children}
        </a>
    );
};

AudioTimestampLink.displayName = "AudioTimestampLink";
