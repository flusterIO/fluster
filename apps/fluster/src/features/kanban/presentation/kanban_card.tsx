import React, { type ReactNode } from "react";
import { KanbanItemManager } from "../state/classes/kanban_item";

interface KanbanCardProps {
    item: KanbanItemManager;
}

const KanbanCard = ({ item }: KanbanCardProps): ReactNode => {
    return <div className="w-fit h-fit p-4 border rounded-lg">{item.label}</div>;
};

KanbanCard.displayName = "KanbanCard";

export default KanbanCard;
