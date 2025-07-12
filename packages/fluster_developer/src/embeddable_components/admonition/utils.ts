import { AdmonitionVariant } from "./types";

export const getTitleVariantClasses = (variant: AdmonitionVariant): string => {
    switch (variant) {
        case "success":
            return "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] [&_p]:text-[hsl(var(--success-foreground))]";
        case "info":
            return "bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] [&_p]:text-[hsl(var(--info-foreground))]";
        case "error":
            return "bg-[hsl(var(--error))] text-[hsl(var(--error-foreground))] [&_p]:text-[hsl(var(--error-foreground))]";
        case "warn":
            return "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] [&_p]:text-[hsl(var(--warning-foreground))]";
        case "primary":
            return "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] [&_p]:text-[hsl(var(--primary-foreground))]";
    }
};
