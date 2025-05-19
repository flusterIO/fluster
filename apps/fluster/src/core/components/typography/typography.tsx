import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
    className?: string;
    children: ReactNode;
}

export function H1({ children, className }: TypographyProps) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className,
            )}
        >
            {children}
        </h1>
    );
}

export function H2({ children, className }: TypographyProps) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
        >
            {children}
        </h2>
    );
}

export function H3({ children, className }: TypographyProps) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className,
            )}
        >
            {children}
        </h3>
    );
}

export function H4({ children, className }: TypographyProps) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
        >
            {children}
        </h4>
    );
}

export function P({ children, className }: TypographyProps) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            {children}
        </p>
    );
}

export function Blockquote({ children, className }: TypographyProps) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            {children}
        </blockquote>
    );
}

export function InlineCode({ children, className }: TypographyProps) {
    return (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className,
            )}
        >
            {children}
        </code>
    );
}

export function LargeText({ children, className }: TypographyProps) {
    return (
        <div className={cn("text-lg font-semibold", className)}>{children}</div>
    );
}

export function SmallText({ children, className }: TypographyProps) {
    return (
        <small className={cn("text-sm font-medium leading-none", className)}>
            {children}
        </small>
    );
}
