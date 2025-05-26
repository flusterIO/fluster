import { Button } from "@fluster/ui";
import React, { type ReactNode } from "react";

interface KanbanAddListColumnProps { }

const KanbanAddListColumn = (props: KanbanAddListColumnProps): ReactNode => {
    return (
        <div className="flex flex-col justify-start items-center gap-6">
            <Button>Add List</Button>
        </div>
    );
};

KanbanAddListColumn.displayName = "KanbanAddListColumn";

export default KanbanAddListColumn;
