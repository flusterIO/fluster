import { LocalModelData } from "@/lib/bindings";
import { formatBytesString } from "@/lib/format_bytes_string";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import dayjs from "dayjs";

export enum LocalModelTableColId {
    name = "name",
    modified_at = "modified_at",
    size = "size",
}

export const getLocalModelTableColumns = (): ColumnDef<LocalModelData>[] => {
    return [
        {
            id: LocalModelTableColId.name,
            accessorKey: "name",
            header: () => {
                return <div>Name</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(LocalModelTableColId.name) as string;
                return <div>{value}</div>;
            },
        },
        {
            id: LocalModelTableColId.modified_at,
            accessorKey: "modified_at",
            header: () => {
                return <div>Modified At</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(LocalModelTableColId.modified_at) as string;
                return dayjs(value).format("MM/DD/YYYY");
            },
        },
        {
            id: LocalModelTableColId.size,
            accessorKey: "size",
            header: () => {
                return <div>Size</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(LocalModelTableColId.size) as string;
                return formatBytesString(
                    typeof value === "string" ? parseInt(value) : value,
                    2
                );
            },
        },
    ];
};
