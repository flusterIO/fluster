import { BibEntryParsed } from "#/bibliography/data/models/bib_entry_parsed";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./sort_header";
import React from "react";
import { Checkbox } from "@fluster.io/dev";
import { MdxTableCell } from "#/mdx/presentation/mdx_table_content";

export const bibTablColumnIds = {
    select: "select",
};

export const bibTableColumns: ColumnDef<BibEntryParsed>[] = [
    {
        id: bibTablColumnIds.select,
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        /* enableHiding: false, */
        size: 50,
        minSize: 32,
        maxSize: 60,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return <MdxTableCell mdx={(row.getValue("title") ?? "--") as string} />;
        },
    },
    {
        accessorKey: "author",
        enableHiding: true,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Author" />
        ),
    },
    {
        accessorKey: "journal",
        enableHiding: true,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Journal" />
        ),
    },
    {
        accessorKey: "year",
        enableHiding: true,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Year" />
        ),
    },
];
