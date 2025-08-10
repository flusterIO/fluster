import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { commands, TaskListData } from "../../../lib/bindings";
import { WithInlineMdx } from "../../types";
import { Checkbox } from "../../../components/shad/checkbox";
import dayjs from "dayjs";

export enum TaskListColumnId {
    id = "id",
    label = "label",
    task_list_id = "task_list_id",
    due_at = "due_at",
    ctime = "ctime",
    complete = "complete",
}

export const getTaskListTableColumns = (
    InlineMdxContent: WithInlineMdx["InlineMdxContent"],
    data: TaskListData["items"]
): ColumnDef<TaskListData["items"][number]>[] => {
    return [
        {
            id: TaskListColumnId.id,
            accessorKey: "id",
            enableSorting: false,
        },
        {
            id: TaskListColumnId.complete,
            accessorKey: "complete",
            header: () => {
                return <div className="w-8" />;
            },
            cell: ({ row }) => {
                const value = row.getValue(TaskListColumnId.complete) as boolean;

                return (
                    <Checkbox
                        checked={value}
                        onClick={async () => {
                            const itemId = row.getValue(TaskListColumnId.id) as string;
                            if (itemId) {
                                const item = data.find((x) => x.id === itemId);
                                if (item) {
                                    const res = await commands.createTask(
                                        {
                                            ...item,
                                            ctime: dayjs(item.ctime, { utc: true })
                                                .toDate()
                                                .valueOf()
                                                .toString(),
                                            complete: !value,
                                        },
                                        []
                                    );
                                    if (res.status === "ok") {
                                        window.dispatchEvent(
                                            new CustomEvent("refresh-embedded-task-list", {
                                                detail: {
                                                    taskListId: item.task_list_id,
                                                },
                                            })
                                        );
                                    }
                                }
                            }
                        }}
                    />
                );
            },
            enableSorting: false,
            size: 50,
            maxSize: 80,
            minSize: 32,
        },
        {
            id: TaskListColumnId.label,
            accessorKey: "label",
            header: () => {
                return <div>Label</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(TaskListColumnId.label) as string;
                console.log("value: ", value);
                return (
                    <InlineMdxContent className="w-full" mdx={value} abortIfNoMath />
                );
            },
        },
        {
            id: TaskListColumnId.due_at,
            header: () => {
                return <div>Due</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(TaskListColumnId.due_at) as string;
                if (value) {
                    return dayjs(value, {
                        utc: true,
                    }).format("MMM Do, YYYY [at] hh:mm a");
                } else {
                    return <div className="text-muted-foreground">--</div>;
                }
            },
        },
    ];
};
