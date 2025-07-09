import React, { type ReactNode } from "react";
import { useLoaderData } from "react-router";

export const KanbanBoardPage = (): ReactNode => {
    const data = useLoaderData();
    console.log("data: ", data);
    return <div>Here</div>;
};

KanbanBoardPage.displayName = "KanbanBoardPage";
