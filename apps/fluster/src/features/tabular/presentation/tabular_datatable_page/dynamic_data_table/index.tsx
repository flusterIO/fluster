import React, { type ReactNode } from "react";
import {
    DataTablePagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fluster.io/dev";
import { useDynamicDataTable } from "./use_dynamic_data_table";
import { flexRender } from "@tanstack/react-table";
import { DynamicDatatableFilterRow } from "./dynamic_data_table_filter_row";
interface DynamicDataTableProps<T extends object> {
    items: T[];
}

export const DynamicDataTable = <T extends object>(
    props: DynamicDataTableProps<T>
): ReactNode => {
    const tableData = useDynamicDataTable(props.items);
    return (
        <>
            <DynamicDatatableFilterRow
                columnVisibility={tableData.columnVisibility}
                setColumnVisibility={tableData.setColumnVisibility}
            />
            <Table>
                <TableHeader>
                    {tableData.table.getHeaderGroups().map((headerGroup) => (
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
                    {tableData.table.getPaginationRowModel().rows?.length ? (
                        tableData.table.getPaginationRowModel().rows.map((row) => (
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
                                colSpan={tableData.columnLength}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination
                table={tableData.table}
                classes={{
                    container: "mt-4",
                }}
            />
        </>
    );
};

DynamicDataTable.displayName = "DynamicDataTable";
