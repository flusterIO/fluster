export const prefersDarkMode = (): boolean => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
