export interface AdmonitionTitleProps {
    type: AdmonitionVariant;
    title: string;
}

export type AdmonitionVariant =
    | "info"
    | "error"
    | "warn"
    | "success"
    | "primary";
