import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fluster.io/dev";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, type ReactNode } from "react";

interface BibEntryDetailsTableProps {
    data: Record<string, string>;
}

interface SimpleTableRow {
    key: string;
    value: string;
}

const WrapCellValue = ({
    val,
    entryKey,
}: {
    val: string;
    entryKey: string;
}): ReactNode => {
    console.log("val: ", val);
    if (!val) {
        return null;
    }
    if (typeof val === "string" && val?.startsWith("http")) {
        return <a href={val}>{val}</a>;
    }
    return (
        <div
            id={`tbl-${entryKey}`}
            dangerouslySetInnerHTML={{ __html: val ?? "" }}
        />
    );
};

const bibEntryTableColumns: ColumnDef<SimpleTableRow>[] = [
    {
        id: "key",
        accessorKey: "key",
        enableHiding: true,
        header: () => <div>Key</div>,
    },
    {
        id: "value",
        accessorKey: "value",
        header: () => <div>Value</div>,
        cell: ({ row }) => {
            return (
                <div className="text-wrap">
                    <WrapCellValue
                        entryKey={row.getValue("key")}
                        val={row.getValue("value")}
                    />
                </div>
            );
        },
        /* cell: ({ row }) => { */

        /*     return <MdxTableCell mdx={(row.getValue("title") ?? "--") as string} />; */
        /* }, */
    },
];

export const BibEntryDetailsTable = ({
    data,
}: BibEntryDetailsTableProps): ReactNode => {
    const entries: SimpleTableRow[] = useMemo(() => {
        return Object.entries(data).map((x) => {
            return {
                key: x[0],
                value: x[1],
            } satisfies SimpleTableRow;
        });
    }, [data]);

    const table = useReactTable({
        data: entries,
        columns: bibEntryTableColumns,
        getCoreRowModel: getCoreRowModel(),
        rowCount: entries.length,
        /* manualPagination: true, */
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
                        <TableCell colSpan={entries.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

BibEntryDetailsTable.displayName = "BibEntryDetailsTable";
