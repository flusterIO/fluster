import { BibEntryParsed } from "#/bibliography/data/models/bib_entry_parsed";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSortHeader } from "./sort_header";
import React from "react";
import { Checkbox, showToast } from "@fluster.io/dev";
import { MdxTableCell } from "#/mdx/presentation/mdx_table_content";
import { copyStringToClipboard } from "@/lib/copy_string_to_clipboard";

export enum BibTableColumnId {
    select = "select",
    title = "title",
    author = "author",
    journal = "journal",
    year = "year",
    id = "id",
}

export const bibTableColumns: ColumnDef<BibEntryParsed>[] = [
    {
        id: BibTableColumnId.select,
        header: ({ table }) => (
            <div className="w-8">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
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
        maxSize: 80,
    },
    {
        id: BibTableColumnId.id,
        accessorKey: "id",
        enableHiding: true,
        enableSorting: true,
        header: ({ column }) => <DataTableSortHeader column={column} title="Id" />,
        cell: ({ row }) => {
            return (
                <div
                    className="cursor-pointer"
                    onClick={async (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const res = await copyStringToClipboard(row.getValue("id"));
                        if (res) {
                            showToast({
                                title: "Success",
                                body: "Your bibliography entry's id has been copied to your clipboard. Click on a different column if you intended to open the details panel.",
                                variant: "Success",
                                duration: 5000,
                            });
                        }
                    }}
                >
                    {row.getValue("id")}
                </div>
            );
        },
    },
    {
        id: BibTableColumnId.title,
        accessorKey: "title",
        enableSorting: true,
        header: ({ column }) => (
            <DataTableSortHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return <MdxTableCell mdx={(row.getValue("title") ?? "--") as string} />;
        },
    },
    {
        id: BibTableColumnId.author,
        accessorKey: "author",
        enableHiding: true,
        enableSorting: true,
        header: ({ column }) => (
            <DataTableSortHeader column={column} title="Author" />
        ),
    },
    {
        id: BibTableColumnId.journal,
        accessorKey: "journal",
        enableHiding: true,
        enableSorting: true,
        header: ({ column }) => (
            <DataTableSortHeader column={column} title="Journal" />
        ),
    },
    {
        id: BibTableColumnId.year,
        accessorKey: "year",
        enableHiding: true,
        enableSorting: true,
        header: ({ column }) => (
            <DataTableSortHeader column={column} title="Year" />
        ),
    },
];
