import { useDarkMode } from "@/hooks/use_dark_mode";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const scrollTarget = (): HTMLElement | null => {
    return document.getElementById("scroll-target");
};

export const useScrollPersist = (_persist_id: string) => {
    const location = useLocation();
    const darkMode = useDarkMode();
    const persist_id = `scroll-${_persist_id}`;
    const timer = useRef<NodeJS.Timeout>(null);
    useEffect(() => {
        const em = scrollTarget();
        if (!em) {
            return;
        }
        window.localStorage.setItem(persist_id, em.scrollTop.toString());
    }, [persist_id]);
    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        const t = setTimeout(() => {
            window.localStorage.setItem(persist_id, "0");
        }, 500);
        timer.current = t;
        /* eslint-disable-next-line  --  */
    }, [location]);
    useEffect(() => {
        const em = scrollTarget();
        if (em) {
            em.scrollTop = parseInt(window.localStorage.getItem(persist_id) ?? "0");
        }
    }, [darkMode]);
};
