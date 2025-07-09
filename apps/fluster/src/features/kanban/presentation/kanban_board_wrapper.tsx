import React, { type ReactNode } from "react";
import { useKanbanContext } from "../state/kanban_provider";
import KanbanList from "./kanban_list";
import KanbanAddListColumn from "./kanban_add_list_column";

const KanbanBoard = (): ReactNode => {
    const { lists } = useKanbanContext();
    return (
        <div className="w-screen h-full max-h-screen flex flex-row justify-start items-start gap-6">
            {lists.map((l) => (
                <KanbanList item={l} key={l.id} />
            ))}
            <KanbanAddListColumn />
        </div>
    );
};

KanbanBoard.displayName = "KanbanBoard";

export default KanbanBoard;
