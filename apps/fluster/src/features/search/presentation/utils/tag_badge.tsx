import { AppRoutes, Badge } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { useNavigate } from "react-router";

interface TagBadgeProps {
    tagValue: string;
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
            }}
        >
            {props.tagValue}
        </Badge>
    );
};

TagBadge.displayName = "TagBadge";
