import React, { useMemo, type ReactNode } from "react";
import { TaskListItem } from "./task_item";
import { NoTasksFoundBanner } from "./no_tasks_found";
import { useTaskListContext } from "#/task_manager/state/task_list_context";
import { TaskModel } from "@/lib/bindings";
import dayjs from "dayjs";

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
        const incompleteWithDueAt: TaskModel[] = [];
        const complete: TaskModel[] = [];
        for (const item of items) {
            if (item.complete) {
                complete.push(item);
            } else {
                if (item.due_at) {
                    incompleteWithDueAt.push(item);
                } else {
                    incomplete.push(item);
                }
            }
        }
        return [
            ...incompleteWithDueAt.sort((a, b) => {
                return (
                    dayjs(a.due_at!, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf() -
                    dayjs(b.due_at!, {
                        utc: true,
                    })
                        .toDate()
                        .valueOf()
                );
            }),
            ...incomplete.sort((a, b) => {
                return new Date(a.ctime).valueOf() - new Date(b.ctime).valueOf();
            }),
            ...complete.sort((a, b) => {
                return new Date(a.ctime).valueOf() - new Date(b.ctime).valueOf();
            }),
        ];
    }, [items]);
    return (
        <div
            id="scroll-target-task-manager"
            className="@container/task_list w-full h-full gap-2 overflow-y-auto"
        >
            {items.length === 0 ? (
                <NoTasksFoundBanner />
            ) : (
                itemData.map((item) => {
                    return <TaskListItem key={item.id} data={item} />;
                })
            )}
        </div>
    );
};

TaskList.displayName = "TaskList";
