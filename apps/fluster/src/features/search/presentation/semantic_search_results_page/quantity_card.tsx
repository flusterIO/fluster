import { cn } from "@fluster.io/dev";
import React, { HTMLProps, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface SearchResultsQuantityCardProps {
    label: ReactNode;
    quantity: number | string;
    href?: string;
}

export const SearchResultsQuantityCard = ({
    label,
    quantity,
    href,
}: SearchResultsQuantityCardProps): ReactNode => {
    const nav = useNavigate();
    const props: HTMLProps<HTMLDivElement> = {
        className: cn(
            "rounded border flex flex-col justify-start items-between gap-4 @[768px]/search_results:gap-8 p-3 bg-card",
            href && "cursor-pointer"
        ),
        ...(href && {
            onClick: () => nav(href),
        }),
    };
    return (
        <div {...props}>
            <div className="font-semibold text-card-foreground">{label}</div>
            <div className="font-thin text-foreground/90 text-2xl">{quantity}</div>
        </div>
    );
};

SearchResultsQuantityCard.displayName = "SearchResultsQuantityCard";
