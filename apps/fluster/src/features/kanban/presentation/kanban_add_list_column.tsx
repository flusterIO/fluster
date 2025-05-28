import { Button } from "@fluster/dev";
import React, { type ReactNode } from "react";


const KanbanAddListColumn = (): ReactNode => {
    return (
        <div className="flex flex-col justify-start items-center gap-6">
            <Button>Add List</Button>
        </div>
    );
};

KanbanAddListColumn.displayName = "KanbanAddListColumn";

export default KanbanAddListColumn;
