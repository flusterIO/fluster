"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fluster.io/dev";
import {
    BibEntryParsed,
    parseBibEntry,
} from "#/bibliography/data/models/bib_entry_parsed";
import { commands, PaginationProps } from "@/lib/bindings";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { bibTableColumns } from "./columns";

export interface BibTableProps {
    predicate?: string;
}

export const BibliographyTable = () => {
    const [entries, setEntries] = useState<BibEntryParsed[]>([]);
    const [pagination] = useState<PaginationProps>({
        page_number: 1,
        per_page: 20,
    });

    const table = useReactTable({
        data: entries,
        columns: bibTableColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const getData = async (_pagination: PaginationProps): Promise<void> => {
        const res = await commands.getBibEntries(null, _pagination);
        console.log("res: ", res);
        if (res.status === "ok") {
            setEntries(res.data.map((entry) => parseBibEntry(entry)));
        } else {
            console.error(
                `An error occurred while parsing bib entries. If this error continues, please file an issue on Github`
            );
        }
    };

    useEffect(() => {
        getData(pagination);
    }, [pagination]);

    return (
        <div className="min-h-screen bg-background w-full">
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
        </div>
    );
};
