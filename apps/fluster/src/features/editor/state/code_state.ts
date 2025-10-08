import { BundledTheme } from "shiki";

export interface JupyterConfigState {
    port: number;
    defaultKernelName: string;
    token: string;
}

export interface CodeState {
    keymap: "vim" | "standard";
    defaultLanguage: string;
    theme: {
        dark: BundledTheme;
        light: BundledTheme;
    };
    /** The debounce timeout in seconds. */
    previewDebounce: number;
    jupyter: JupyterConfigState;
}
