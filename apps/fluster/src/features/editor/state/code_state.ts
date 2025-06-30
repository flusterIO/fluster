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
    jupyter: JupyterConfigState;
}
