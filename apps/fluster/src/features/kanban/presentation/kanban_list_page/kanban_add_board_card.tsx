import { Button } from "@fluster.io/dev";
import React, { type ReactNode } from "react";
import { KanbanActions, useKanbanDispatch } from "../../state/kanban_provider";
import { H3 } from "@fluster.io/dev";

const KanbanAddBoardCard = (): ReactNode => {
    const dispatch = useKanbanDispatch();
    return (
        <div className="w-full h-full max-w-[300px-6 border rounded space-y-6 py-6 px-8">
            <H3 className="w-full text-center">Create a new board</H3>
            <Button
                className="w-full"
                onClick={() => {
                    dispatch({
                        type: KanbanActions.showAddBoardModal,
                        payload: true,
                    });
                }}
            >
                Create
            </Button>
        </div>
    );
};

KanbanAddBoardCard.displayName = "KanbanAddBoardCard";

export default KanbanAddBoardCard;
