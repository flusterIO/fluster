import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { commands, KanbanBoardModel } from "@/lib/bindings";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuTrigger,
} from "@fluster.io/dev";
import {
    KanbanActions,
    useKanbanDispatch,
} from "#/kanban/state/kanban_provider";

interface KanbanBoardSummaryCardProps {
    item: KanbanBoardModel;
}

const KanbanBoardSummaryCard = ({
    item,
}: KanbanBoardSummaryCardProps): ReactNode => {
    const dispatch = useKanbanDispatch();
    const handleDelete = async (): Promise<void> => {
        const res = await commands.deleteKanbanBoardById(item.id);
        if (res.status === "ok") {
            dispatch({
                type: KanbanActions.removeListById,
                payload: item.id,
            });
        }
    };

    return (
        <ContextMenu>
            <ContextMenuContent>
                <ContextMenuGroup>
                    <ContextMenuLabel>Actions</ContextMenuLabel>
                    <ContextMenuItem className="text-red-500" onClick={handleDelete}>
                        Delete
                    </ContextMenuItem>
                </ContextMenuGroup>
            </ContextMenuContent>
            <ContextMenuTrigger asChild>
                <div
                    className={cn(
                        "w-full h-full flex flex-col justify-center items-center p-4 bg-card text-card-foreground rounded border hover:border-primary transition-colors duration-200 cursor-pointer"
                    )}
                >
                    <InlineMdxContent
                        mdx={item.label}
                        className="text-xl font-semibold tracking-tight w-full text-center"
                    />
                    {item.desc?.length && (
                        <div className="[&_p]:text-muted-foreground w-full text-center">
                            <InlineMdxContent mdx={item.desc} />
                        </div>
                    )}
                </div>
            </ContextMenuTrigger>
            <GoogleAnalytics gaId="G-Y02PEY1GJZ" />
        </ContextMenu>
    );
};

KanbanBoardSummaryCard.displayName = "KanbanBoardSummaryCard";

export default KanbanBoardSummaryCard;
