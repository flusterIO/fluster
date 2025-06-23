import { useConfirmation } from "#/confirmation_modal/state/hooks/use_confirmation";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { showToast } from "#/toast_notification/data/events/show_toast";
import { commands, TaskListModel } from "@/lib/bindings";
import { AppRoutes, cn } from "@fluster.io/dev";
import { XIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface TaskListCardProps {
    item: TaskListModel;
}

export const TaskListCard = ({ item }: TaskListCardProps): ReactNode => {
    const handleDelete = async (): Promise<void> => {
        const res = await commands.deleteTaskListById(item.id);
        if (res.status === "ok") {
            window.dispatchEvent(new CustomEvent("request-task-lists-refresh"));
        } else {
            console.error(
                "An error occurred while attempting to delete this task: ",
                res.error
            );
        }
    };
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const isActive = searchParams.get("listId") === item.id;
    const confirmationId = `delete-${item.id}`;
    const confirm = useConfirmation(
        {
            id: confirmationId,
            acceptButtonText: "Delete",
            denyButtonText: "Cancel",
            title: "Are you sure?",
            body: "Deleting this task is irreversable.",
            confirmationVariant: "destructive",
        },
        () => {
            handleDelete().catch(() => {
                showToast({
                    title: "Oh no",
                    body: "Something went wrong while deleting this task.",
                    variant: "Error",
                    duration: 5000,
                });
            });
        }
    );

    return (
        <div
            className={cn(
                "w-full pr-4 py-4 pl-2 border rounded-lg grid grid-cols-[2rem_1fr] hover:bg-muted/60 transition-colors duration-150 cursor-pointer",
                isActive && "bg-muted/80"
            )}
            onClick={() => {
                if (isActive) {
                    nav(AppRoutes.taskLists);
                } else {
                    const sp = new URLSearchParams();
                    sp.set("listId", item.id);
                    nav(`${AppRoutes.taskLists}?${sp.toString()}`);
                }
            }}
        >
            <XIcon
                className="w-4 h-4 place-self-center cursor-pointer"
                onClick={() => confirm.setVisible(true)}
            />
            <InlineMdxContent mdx={item.label} />
        </div>
    );
};

TaskListCard.displayName = "TaskListCard";
