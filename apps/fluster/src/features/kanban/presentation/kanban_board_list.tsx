import React, { type ReactNode } from "react";
import { KanbanProvider } from "../state/kanban_provider";
import { ComingSoon } from "@/components/coming_soon";

const KanbanBoardList = (): ReactNode => {
    /* const { lists } = useKanbanContext(); */
    /* const isEven = lists.length % 2 === 0; */
    /* const gridItems = isEven ? [...lists] : lists.slice(0, lists.length - 2); */
    return (
        <KanbanProvider>
            <div className="w-full flex flex-col justify-center items-center gap-6">
                <ComingSoon featureName="kanban" />
                {/*   <div className="grid md:grid-cols-2 grid-cols-1"> */}
                {/*     {gridItems.map((x) => ( */}
                {/*       <KanbanBoardSummaryCard item={x} key={`kanban-summary-${x.id}`} /> */}
                {/*     ))} */}
                {/*     {!isEven && <KanbanAddBoardCard />} */}
                {/*   </div> */}
                {/*   {isEven && <KanbanAddBoardCard />} */}
                {/*   <AddKanbanBoardModal /> */}
            </div>
        </KanbanProvider>
    );
};

KanbanBoardList.displayName = "KanbanBoardList";

export default KanbanBoardList;
