import { Button } from "@/components/ui/shad/button";
import React, { type ReactNode } from "react";

const KanbanAddBoardCard = (): ReactNode => {
    return (
        <div className="w-full h-fit p-6">
            <Button>Create new board</Button>
        </div>
    );
};

KanbanAddBoardCard.displayName = "KanbanAddBoardCard";

export default KanbanAddBoardCard;
