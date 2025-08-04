import { useMemo } from "react";
import {
    parseTimestampLinkString,
    TimestampData,
} from "./parse_timestamp_link_string";

/** Parses the timestamp string as it appears in video timestamp links and audio timestamp links, *not* how it appears in the database as a stringified unix timestamp. */
export const useParsedTimestampString = (
    timestampString: string
): TimestampData | null => {
    return useMemo(() => {
        return parseTimestampLinkString(timestampString);
    }, [timestampString]);
};
