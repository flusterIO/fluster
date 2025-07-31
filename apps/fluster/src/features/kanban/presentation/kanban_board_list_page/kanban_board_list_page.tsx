import { ComingSoon } from "@/components/coming_soon";
import React, { type ReactNode } from "react";
/* import { KanbanProvider, useKanbanContext } from "../../state/kanban_provider"; */
/* import KanbanBoardSummaryCard from "./kanban_board_summary_card"; */
/* import KanbanAddBoardCard from "./kanban_add_board_card"; */
/* import AddKanbanBoardModal from "../add_kanban_board_modal/add_kanban_board_modal"; */
/* import { cn } from "@fluster.io/dev"; */
/* /* import { ComingSoon } from "@/components/coming_soon"; */

export const KanbanBoardListPage = (): ReactNode => {
    /* const { lists } = useKanbanContext(); */
    return (
        <div className="w-full h-full flex flex-col justify-center items-center flex-grow">
            <ComingSoon featureName="Kanban" />
        </div>
    );
    /* return ( */
    /*     <KanbanProvider> */
    /*         <div */
    /*             id="scroll-target" */
    /*             className="@container/kanban_page w-full flex flex-col justify-center items-center gap-6 px-8 overflow-y-auto" */
    /*         > */
    /*             <div */
    /*                 className={cn( */
    /*                     "max-w-[min(1080px,100%)] grid gap-6", */
    /*                     lists.length === 0 && "flex flex-col justify-center items-center" */
    /*                 )} */
    /*                 style={{ */
    /*                     display: "grid", */
    /*                     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", */
    /*                 }} */
    /*             > */
    /*                 <KanbanAddBoardCard /> */
    /*                 {lists.map((x) => ( */
    /*                     <KanbanBoardSummaryCard item={x} key={`kanban-summary-${x.id}`} /> */
    /*                 ))} */
    /*             </div> */
    /*             <AddKanbanBoardModal /> */
    /*         </div> */
    /*     </KanbanProvider> */
    /* ); */
};

KanbanBoardListPage.displayName = "KanbanPage";
