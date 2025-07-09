"use client";
import React, { type ReactNode } from "react";

interface KanbanListlProps {
    item: object;
}

const KanbanList = (props: KanbanListlProps): ReactNode => {
    console.log("props: ", props);
    return <div>Not Implemented</div>;
};

KanbanList.displayName = "KanbanList";

export default KanbanList;
