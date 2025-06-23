import { useEffect, useState } from "react";
import { Size } from "../types/general";
import { useEventListener } from "./use_event_listener";

export const useMainPanelSize = (): Size | null => {
    const [size, setSize] = useState<Size | null>(null);
    const getEm = (): HTMLDivElement | null => {
        const em = document.getElementById("scroll-target") as HTMLDivElement;
        if (em && em.hasAttribute("data-main-panel")) {
            return em;
        } else {
            return null;
        }
    };
    const handleSize = (): void => {
        const em = getEm();
        if (!em) {
            return;
        }
        const rect = em.getBoundingClientRect();
        setSize({
            width: rect.width,
            height: rect.height,
        });
    };
    useEventListener("panel-resize", () => {
        handleSize();
    });

    useEffect(() => {
        const em = getEm();
        handleSize();
        if (!em) {
            return;
        } else {
            em.addEventListener("resize", handleSize);
        }
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener("resize", handleSize);
            em?.removeEventListener("resize", handleSize);
        };
    }, []);
    return size;
};
