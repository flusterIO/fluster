import type * as app from "@tauri-apps/api";

declare global {
    interface Window {
        __TAURI__: typeof app;
    }
}
