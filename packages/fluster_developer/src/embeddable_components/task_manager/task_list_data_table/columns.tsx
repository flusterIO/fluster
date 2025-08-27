import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { commands, TaskListData } from "../../../lib/bindings";
import { WithInlineMdx } from "../../types";
import { Checkbox } from "../../../components/shad/checkbox";
import dayjs from "dayjs";
import { parseTaskDates } from "../../../utils/date_parsers";

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
            header: "",
            /* header: ({ table }) => ( */
            /*     <Checkbox */
            /*         checked={ */
            /*             table.getIsAllPageRowsSelected() || */
            /*             (table.getIsSomePageRowsSelected() && "indeterminate") */
            /*         } */
            /*         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} */
            /*         aria-label="Select all" */
            /*     /> */
            /* ), */
            cell: ({ row }) => {
                const value = row.getValue(TaskListColumnId.complete) as boolean;

                return (
                    <Checkbox
                        checked={value}
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const itemId = row.getValue(TaskListColumnId.id) as string;
                            console.log("itemId: ", itemId);
                            if (itemId) {
                                const item = data.find((x) => x.id === itemId);
                                console.log("item: ", item);
                                if (item) {
                                    console.log("Data: ", {
                                        ...parseTaskDates(item),
                                        complete: !value,
                                    });
                                    const res = await commands.createTask(
                                        {
                                            ...parseTaskDates(item),
                                            complete: !value,
                                        },
                                        []
                                    );
                                    console.log("res: ", res);
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
            /* size: 32, */
            /* maxSize: 80, */
            /* minSize: 32, */
        },
        {
            id: TaskListColumnId.label,
            accessorKey: "label",
            header: () => {
                return <div className="w-full">Label</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(TaskListColumnId.label) as string;
                return (
                    <InlineMdxContent className="w-full" mdx={value} abortIfNoMath />
                );
            },
        },
        {
            id: TaskListColumnId.due_at,
            size: 120,
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
