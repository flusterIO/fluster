import React, { HTMLProps } from "react";
import { cn } from "../../utils/cn";
import { WithInlineMdxProp } from "../../embeddable_components/types";

interface MdxTypographyProps extends WithInlineMdxProp {
    className?: string;
    mdx: string;
}

export function MdxH1({
    mdx,
    className,
    InlineMdxContent,
    ...props
}: MdxTypographyProps & HTMLProps<HTMLHeadingElement>) {
    return (
        <h1
            {...props}
            className={cn(
                "scroll-m-20 [&_p]:text-4xl [&_p]:font-extrabold [&_p]:tracking-tight [&_p]:lg::text-5xl",
                className
            )}
        >
            <InlineMdxContent mdx={mdx} />
        </h1>
    );
}

export function MdxH2({
    mdx,
    className,
    InlineMdxContent,
    ...props
}: MdxTypographyProps & HTMLProps<HTMLHeadingElement>) {
    return (
        <h2
            {...props}
            className={cn(
                "scroll-m-20 border-b pb-2 [&_p]:text-3xl [&_p]:font-semibold [&_p]:tracking-tight first:mt-0",
                className
            )}
        >
            <InlineMdxContent mdx={mdx} />
        </h2>
    );
}

export function MdxH3({
    mdx,
    className,
    InlineMdxContent,
    ...props
}: MdxTypographyProps & HTMLProps<HTMLHeadingElement>) {
    return (
        <h3
            {...props}
            className={cn(
                "scroll-m-20 [&_p]:text-2xl [&_p]:font-semibold [&_p]:tracking-tight",
                className
            )}
        >
            <InlineMdxContent mdx={mdx} />
        </h3>
    );
}

export function MdxH4({
    mdx,
    className,
    InlineMdxContent,
    ...props
}: MdxTypographyProps & HTMLProps<HTMLHeadingElement>) {
    return (
        <h4
            {...props}
            className={cn(
                "scroll-m-20 [&_p]:text-xl [&_p]:font-semibold [&_p]:tracking-tight",
                className
            )}
        >
            <InlineMdxContent mdx={mdx} />
        </h4>
    );
}

export function MdxP({ mdx, className, InlineMdxContent }: MdxTypographyProps) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            <InlineMdxContent mdx={mdx} />
        </p>
    );
}

export function MdxBlockquote({
    mdx,
    className,
    InlineMdxContent,
}: MdxTypographyProps) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            <InlineMdxContent mdx={mdx} />
        </blockquote>
    );
}

export function MdxInlineCode({
    mdx,
    className,
    InlineMdxContent,
}: MdxTypographyProps) {
    return (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] [&_p]:font-mono [&_p]:text-sm [&_p]:font-semibold",
                className
            )}
        >
            <InlineMdxContent mdx={mdx} />
        </code>
    );
}

export function MdxLargeText({
    mdx,
    className,
    InlineMdxContent,
}: MdxTypographyProps) {
    return (
        <div className={cn("[&_p]:text-lg [&_p]:font-semibold", className)}>
            <InlineMdxContent mdx={mdx} />
        </div>
    );
}

export function MdxSmallText({
    mdx,
    className,
    InlineMdxContent,
}: MdxTypographyProps) {
    return (
        <small
            className={cn("[&_p]:text-sm [&_p]:font-medium leading-none", className)}
        >
            <InlineMdxContent mdx={mdx} />
        </small>
    );
}
