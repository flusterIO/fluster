import { RefObject, useEffect } from "react";

export const useViewportProportionalPosition = <T extends HTMLElement>(
    ref: RefObject<T>,
    cb: (scrollPosition: number) => void
) => {
    const handleScroll = () => {
        if (!ref.current) {
            return;
        }
        const rect = ref.current.getBoundingClientRect();
        const newValue =
            1 -
            Math.abs(
                (rect.y - (window.innerHeight - rect.height) / 2) /
                ((window.innerHeight + rect.height) / 2)
            );
        cb(newValue);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        /* eslint-disable-next-line  --  */
    }, []);
};
