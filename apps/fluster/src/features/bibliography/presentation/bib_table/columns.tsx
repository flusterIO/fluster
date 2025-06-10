import { BibEntryParsed } from "#/bibliography/data/models/bib_entry_parsed";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./sort_header";
import React from "react";
import { Checkbox } from "@fluster.io/dev";
import { MdxTableCell } from "#/mdx/presentation/mdx_table_content";

export enum BibTableColumnId {
  select = "select",
  title = "title",
  author = "author",
  journal = "journal",
  year = "year",
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
    id: BibTableColumnId.title,
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <MdxTableCell mdx={(row.getValue("title") ?? "--") as string} />;
    },
  },
  {
    id: BibTableColumnId.author,
    accessorKey: "author",
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
  },
  {
    id: BibTableColumnId.journal,
    accessorKey: "journal",
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Journal" />
    ),
  },
  {
    id: BibTableColumnId.year,
    accessorKey: "year",
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
  },
];
