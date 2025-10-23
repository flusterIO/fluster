import { writeText } from '@tauri-apps/plugin-clipboard-manager';

export const copyStringToClipboard = async (s: string): Promise<boolean> => {
    try {
        /* @ts-ignore */
        const { writeText } = window.__TAURI__.clipboardManager;
        // await navigator.clipboard.writeText(s);
        await writeText(s)
        return true;
    } catch (err) {
        console.error("Failed to copy: ", err);
        return false;
    }
};
