import React, { type ReactNode } from "react";

interface KanbanCardProps {
    /* item: KanbanListItem; */
    item: null;
}

const KanbanCard = ({ item }: KanbanCardProps): ReactNode => {
    console.log("item: ", item);
    return <div>Not Implemented</div>;
};

KanbanCard.displayName = "KanbanCard";

export default KanbanCard;
