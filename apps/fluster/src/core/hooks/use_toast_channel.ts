import { ToastConfig } from "@/lib/bindings";
import { showToast } from "@fluster.io/dev";
import { Channel } from "@tauri-apps/api/core";
import { useMemo } from "react";

export const useToastChannel = () => {
    return useMemo(() => {
        const toastChannel = new Channel<ToastConfig>();
        toastChannel.onmessage = (toastConfig) => showToast(toastConfig);
        return toastChannel;
    }, []);
};
