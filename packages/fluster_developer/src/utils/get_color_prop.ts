export const defaultBooleanColors = [
    "primary",
    "primary-foreground",
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    "ring",
    "info",
    "info-foreground",
    "success",
    "success-foreground",
    "error",
    "error-foreground",
    "warning",
    "warning-foreground",
] as const;

const getContrastColor = (colorValue: string): string | undefined => {
    return defaultBooleanColors.find((x) => x === `${colorValue}-foreground`);
};

export const getColorProp = (
    props: object,
    defaultColor: (typeof defaultBooleanColors)[number]
): {
    color: string;
    foreground?: string;
} => {
    const keys = defaultBooleanColors.map((c) => {
        return {
            asKey: c.replaceAll("-", "_"),
            original: c,
        };
    });
    for (const k of keys) {
        if (k.asKey in props && props[k.asKey as keyof typeof props] === true) {
            const foreground = getContrastColor(k.original);
            return {
                color: `hsl(var(--${k.original}))`,
                ...(foreground && {
                    foreground: `hsl(var(--${foreground}))`,
                }),
            };
        }
    }
    if ("color" in props && typeof props.color === "string") {
        if (
            defaultBooleanColors.includes(
                props.color as (typeof defaultBooleanColors)[number]
            )
        ) {
            const foreground = getContrastColor(props.color);
            return {
                color: `hsl(var(--${props.color}))`,
                ...(foreground && {
                    foreground: `hsl(var(--${foreground}))`,
                }),
            };
        }
        return {
            color: props.color,
        };
    }
    const foreground = getContrastColor(defaultColor);
    return {
        color: `hsl(var(--${defaultColor}))`,
        ...(foreground && {
            foreground: `hsl(var(--${foreground}))`,
        }),
    };
};

const val = getColorProp(
    {
        color: "secondary",
    },
    "primary"
);

console.log("val: ", val);
