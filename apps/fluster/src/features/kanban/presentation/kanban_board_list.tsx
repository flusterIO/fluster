import { type ReactNode } from "react";
import KanbanBoardSummaryCard from "./kanban_board_summary_card";
import { KanbanProvider, useKanbanContext } from "../state/kanban_provider";
import KanbanAddBoardCard from "./kanban_add_board_card";
import AddKanbanBoardModal from "./add_kanban_board_modal/add_kanban_board_modal";

const KanbanBoardList = (): ReactNode => {
    const { lists } = useKanbanContext();
    let isEven = lists.length % 2 === 0;
    let gridItems = isEven ? [...lists] : lists.slice(0, lists.length - 2);
    return (
        <KanbanProvider>
            <div className="w-full flex flex-col justify-center items-center gap-6">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    {gridItems.map((x) => (
                        <KanbanBoardSummaryCard item={x} key={`kanban-summary-${x.id}`} />
                    ))}
                    {!isEven && <KanbanAddBoardCard />}
                </div>
                {isEven && <KanbanAddBoardCard />}
                <AddKanbanBoardModal />
            </div>
        </KanbanProvider>
    );
};

KanbanBoardList.displayName = "KanbanBoardList";

export default KanbanBoardList;
