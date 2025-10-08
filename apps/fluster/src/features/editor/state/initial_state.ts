import { CodeState } from "./code_state";

export const initialCodeState: CodeState = {
    keymap: "standard",
    defaultLanguage: "python",
    theme: {
        dark: "dracula",
        light: "github-light",
    },
    jupyter: {
        port: 21521,
        token: "",
        defaultKernelName: "python",
    },
    previewDebounce: 0.5,
};
