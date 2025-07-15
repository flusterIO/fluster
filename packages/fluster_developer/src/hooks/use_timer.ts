import { useState, useEffect } from "react";

/** Returns the time in milliseconds until the timer elapses. */
export const useTimeToDue = (
    dueAt: Date | null,
    onTimeout: () => void
): number | null => {
    const [timeUntil, setTimeUntil] = useState<number | null>(null);
    const [hasRanTimer, setHasRanTimer] = useState(false);
    const getTimeUntil = (_dueAt: Date): void => {
        const t = new Date().valueOf() - _dueAt.valueOf();
        if (!hasRanTimer && t <= 0) {
            onTimeout();
            setHasRanTimer(true);
        }
        setTimeUntil(t);
    };
    useEffect(() => {
        if (dueAt === null) {
            setTimeUntil(null);
        } else {
            const interval = setInterval(() => getTimeUntil(dueAt), 1000);
            return () => clearInterval(interval);
        }
        /* eslint-disable-next-line  --  */
    }, [dueAt]);
    return timeUntil;
};
