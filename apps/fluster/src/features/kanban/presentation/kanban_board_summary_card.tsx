import React, { type ReactNode } from "react";
import { KanbanListManager } from "../state/classes/kanban_list";
import { LargeText } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

interface KanbanBoardSummaryCardProps {
    item: KanbanListManager;
    /// Whether or not this item should occupy the entire row.
    isLast?: boolean;
}

const KanbanBoardSummaryCard = ({
    item,
    isLast,
}: KanbanBoardSummaryCardProps): ReactNode => {
    return (
        <div
            className={cn(
                "w-full flex flex-col justify-center items-center p-4 bg-primary text-primary-foreground",
                !isLast && "h-full",
            )}
        >
            <LargeText>{item.label}</LargeText>
        </div>
    );
};

KanbanBoardSummaryCard.displayName = "KanbanBoardSummaryCard";

export default KanbanBoardSummaryCard;
