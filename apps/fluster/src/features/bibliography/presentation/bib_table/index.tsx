"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    useEventListener,
} from "@fluster.io/dev";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { bibTableColumns } from "./columns";
import {
    useBibTableContext,
    useBibTableDispatch,
} from "#/bibliography/state/bib_table_context";
import { useBibTableSearchParams } from "#/bibliography/state/use_bib_table_search_params";
import { showBibEntryDetails } from "#/bibliography/data/methods/show_bib_entry_details";

export interface BibTableProps {
    predicate?: string;
}

interface SetBibTableFilterEventProps {
    query: string;
}
declare global {
    interface WindowEventMap {
        "set-bib-table-filter": CustomEvent<SetBibTableFilterEventProps>;
    }
}

export const BibliographyTable = () => {
    const { entries, filteredEntries, count, columnVisibility } =
        useBibTableContext();
    const dispatch = useBibTableDispatch();

    useBibTableSearchParams();

    const table = useReactTable({
        data: filteredEntries,
        columns: bibTableColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: count,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnVisibility,
        },
    });

    useEventListener("set-bib-table-filter", (e) => {
        dispatch({
            type: "setFilteredEntries",
            payload:
                e.detail.query.trim() === ""
                    ? entries
                    : entries.filter((x) => {
                        if (x.title.includes(e.detail.query)) {
                            return true;
                        }
                        if (x.author.includes(e.detail.query)) {
                            return true;
                        }
                        if (x.url.includes(e.detail.query)) {
                            return true;
                        }
                        if (x.journal.includes(e.detail.query)) {
                            return true;
                        }
                        if (x.model.user_provided_id?.includes(e.detail.query)) {
                            return true;
                        }
                        return false;
                    }),
        });
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
                            onClick={() => {
                                const _id: string = (
                                    row.getValue("id") as string
                                )?.toLowerCase();
                                if (!_id) {
                                    return;
                                }
                                const entry = filteredEntries.find(
                                    (f) => f.model.id.toLowerCase() === _id
                                );
                                if (!entry) {
                                    console.error(
                                        "Could not find the entry while attempting to view bib entry details."
                                    );
                                    return;
                                } else {
                                    showBibEntryDetails(entry);
                                }
                            }}
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
