export interface TimestampData {
    hours: number;
    minutes: number;
    seconds: number;
}

export const parseTimestampLinkString = (
    timestampString: string
): TimestampData | null => {
    const res = timestampString.split(":");
    const hours = res.length >= 3 ? parseInt(res[0]) : 0;
    const minutes = res.length >= 3 ? parseInt(res[1]) : parseInt(res[0]);
    const seconds = parseInt(res[res.length - 1]);
    return {
        hours,
        minutes,
        seconds,
    };
};
