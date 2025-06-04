export const flusterColors = {
    primary: "--primary",
    secondary: "--secondary",
    "secondary-foreground": "--secondary-foreground",
    muted: "--muted",
    "muted-foreground": "--muted-foreground",
    accent: "--accent",
    "accent-foreground": "--accent-foreground",
    destructive: "--destructive",
    "destructive-foreground": "--destructive-foreground",
    warning: "--warning",
    success: "--success",
    info: "--info",
};

export const getColorVariable = (c: string): string | undefined => {
    return c in flusterColors
        ? `hsl(var(${flusterColors[c as keyof typeof flusterColors]}))`
        : c;
};

export type FlusterColor = keyof typeof flusterColors;
