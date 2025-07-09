import React, { useMemo, type ReactNode } from "react";
import { TaskListItem } from "./task_item";
import { NoTasksFoundBanner } from "./no_tasks_found";
import { useTaskListContext } from "#/task_manager/state/task_list_context";
import { TaskModel } from "@/lib/bindings";

interface TaskListRefreshEventProps {
    /// The id of the task list.
    id: string;
}
declare global {
    interface WindowEventMap {
        "request-task-list-refresh": CustomEvent<TaskListRefreshEventProps>;
    }
}

export const TaskList = (): ReactNode => {
    const { items } = useTaskListContext();
    const itemData = useMemo(() => {
        const incomplete: TaskModel[] = [];
        const complete: TaskModel[] = [];
        for (const item of items) {
            if (item.complete) {
                complete.push(item);
            } else {
                incomplete.push(item);
            }
        }
        return {
            incomplete: incomplete.sort((a, b) => {
                console.log("a, b: ", a, b);
                return new Date(a.ctime).valueOf() - new Date(b.ctime).valueOf();
            }),
            complete: complete.sort((a, b) => {
                console.log("a, b: ", a, b);
                return new Date(a.ctime).valueOf() - new Date(b.ctime).valueOf();
            }),
        };
    }, [items]);
    return (
        <div id="scroll-target-task-manager" className="@container/task_list w-full h-full gap-2 overflow-y-auto">
            {items.length === 0 ? (
                <NoTasksFoundBanner />
            ) : (
                [...itemData.incomplete, ...itemData.complete].map((item) => {
                    return <TaskListItem key={item.id} data={item} />;
                })
            )}
        </div>
    );
};

TaskList.displayName = "TaskList";
