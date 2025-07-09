"use client";
import React, { useEffect, useRef, useState } from "react";
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
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { bibTableColumns } from "./columns";
import {
    useBibTableContext,
    useBibTableDispatch,
} from "#/bibliography/state/bib_table_context";
import { useBibTableSearchParams } from "#/bibliography/state/use_bib_table_search_params";
import { showBibEntryDetails } from "#/bibliography/data/methods/show_bib_entry_details";
import { DataTablePagination } from "@/components/table/table_pagination";

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
    const { filteredEntries, count, columnVisibility } = useBibTableContext();
    const dispatch = useBibTableDispatch();
    const tableContainer = useRef<HTMLTableSectionElement>(null!);
    const [sorting, setSorting] = useState<SortingState>([]);
    useBibTableSearchParams();
    const [minHeight, setMinHeight] = useState<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });
    const table = useReactTable({
        autoResetPageIndex: true,
        columns: bibTableColumns,
        data: filteredEntries,
        getCoreRowModel: getCoreRowModel(),
        rowCount: count,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onColumnVisibilityChange: (newVisiblity) =>
            dispatch({
                type: "setColumnVisibility",
                payload: newVisiblity as typeof columnVisibility,
            }),
        state: {
            columnVisibility,
            sorting,
            columnFilters,
            pagination,
        },
    });

    useEffect(() => {
        if (table.getPaginationRowModel().rows.length === pagination.pageSize) {
            const h = tableContainer.current.getBoundingClientRect().height;
            if (h) {
                setMinHeight(`${h}px`);
            }
        }
    }, [pagination]);

    useEventListener("set-bib-table-filter", (e) => {
        table.getColumn("title")?.setFilterValue(e.detail.query);
    });

    return (
        <>
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
                <TableBody
                    ref={tableContainer}
                    style={{
                        minHeight,
                    }}
                >
                    {table.getPaginationRowModel().rows?.length ? (
                        table.getPaginationRowModel().rows.map((row) => (
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
            <DataTablePagination table={table} />
        </>
    );
};
