import { Button } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { KanbanActions, useKanbanDispatch } from "../state/kanban_provider";

const KanbanAddBoardCard = (): ReactNode => {
    const dispatch = useKanbanDispatch();
    return (
        <div className="w-full h-full p-6 border rounded">
            <Button
                onClick={() => {
                    dispatch({
                        type: KanbanActions.showAddBoardModal,
                        payload: true,
                    });
                }}
            >
                Create new board
            </Button>
        </div>
    );
};

KanbanAddBoardCard.displayName = "KanbanAddBoardCard";

export default KanbanAddBoardCard;
