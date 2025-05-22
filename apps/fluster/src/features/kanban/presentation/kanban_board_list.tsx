import React, { type ReactNode } from "react";
import KanbanBoardSummaryCard from "./kanban_board_summary_card";
import { useKanbanContext } from "../state/kanban_provider";
import KanbanAddBoardCard from "./kanban_add_board_card";

const KanbanBoardList = (): ReactNode => {
    const { lists } = useKanbanContext();
    let isEven = lists.length % 2 === 0;
    let gridItems = isEven ? [...lists] : lists.slice(0, lists.length - 2);
    return (
        <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="grid md:grid-cols-2 grid-cols-1">
                {gridItems.map((x) => (
                    <KanbanBoardSummaryCard item={x} key={`kanban-summary-${x.id}`} />
                ))}
                {!isEven && <KanbanAddBoardCard />}
            </div>
            {isEven && <KanbanAddBoardCard />}
        </div>
    );
};

KanbanBoardList.displayName = "KanbanBoardList";

export default KanbanBoardList;
