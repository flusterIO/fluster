import { type ReactNode } from "react";
import KanbanBoardInternal from "./kanban_board";
import { KanbanProvider } from "../state/kanban_provider";

const KanbanBoard = (): ReactNode => {
    return (
        <KanbanProvider>
            <KanbanBoardInternal />
        </KanbanProvider>
    );
};

KanbanBoard.displayName = "KanbanBoard";

export default KanbanBoard;
