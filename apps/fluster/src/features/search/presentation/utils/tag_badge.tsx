import { AppRoutes, Badge } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface TagBadgeProps {
    tagValue: string;
    onClick?: () => void;
}

export const TagBadge = (props: TagBadgeProps): ReactNode => {
    const nav = useNavigate();
    return (
        <Badge
            className="cursor-pointer"
            onClick={() => {
                const sp = new URLSearchParams();
                sp.set("by_tag", props.tagValue);
                nav(`${AppRoutes.search}?${sp.toString()}`);
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            {props.tagValue}
        </Badge>
    );
};

TagBadge.displayName = "TagBadge";
