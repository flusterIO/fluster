import { TraditionalSearchResults } from "@/lib/bindings";
import { ColumnDef } from "@tanstack/react-table";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import React from "react";
import dayjs from "dayjs";

export enum TaskItemSearchResultColumnId {
    id = "id",
    label = "label",
    task_list_id = "task_list_id",
    due_at = "due_at",
    ctime = "ctime",
    complete = "complete",
}

export const getTaskItemSearchResultColumns = (): ColumnDef<
    TraditionalSearchResults["tasks"][number]
>[] => {
    return [
        {
            id: TaskItemSearchResultColumnId.id,
            accessorKey: "id",
            enableSorting: false,
        },
        {
            id: TaskItemSearchResultColumnId.task_list_id,
            accessorKey: "task_list_id",
            enableSorting: false,
        },
        {
            id: TaskItemSearchResultColumnId.label,
            accessorKey: "label",
            enableSorting: true,
            cell: ({ row }) => {
                return (
                    <InlineMdxContent
                        mdx={row.getValue(TaskItemSearchResultColumnId.label) ?? ""}
                        abortIfNoMath
                    />
                );
            },
        },
        {
            id: TaskItemSearchResultColumnId.due_at,
            accessorKey: "due_at",
            header: "Due at",
            cell: ({ row }) => {
                const due_at = row.getValue(TaskItemSearchResultColumnId.due_at);
                if (!due_at) {
                    return <div className="text-muted-foreground">--</div>;
                }
                const t = dayjs(due_at as string, {
                    utc: true,
                }).format("MMM Do, YYYY [at] hh:mm a");
                return t;
            },
        },
    ];
};
