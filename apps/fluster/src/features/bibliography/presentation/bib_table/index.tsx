"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@fluster.io/dev";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { bibTableColumns } from "./columns";
import { useBibTableContext } from "#/bibliography/state/bib_table_context";
import { useBibTableSearchParams } from "#/bibliography/state/use_bib_table_search_params";

export interface BibTableProps {
  predicate?: string;
}

export const BibliographyTable = () => {
  const { entries, count, columnVisibility } = useBibTableContext();

  useBibTableSearchParams();

  const table = useReactTable({
    data: entries,
    columns: bibTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: count,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={bibTableColumns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
