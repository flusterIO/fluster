import { LocalModelData } from "@/lib/bindings";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export interface KeymapTableData {
    /// The key in the AppState.keymap object, not the key pressed.
    settingKey: string;
    modified_at: string;
    desc?: string;
}

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
                console.log("value: ", value);
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
                return value;
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
                return value;
            },
        },
    ];
};
