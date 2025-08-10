import React, { useEffect, useState, type ReactNode } from "react";
import {
    Input,
    Label,
    showToast,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    useEventListener,
} from "@fluster.io/dev";
import { getLocalModelTableColumns, LocalModelTableColId } from "./columns";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { commands, LocalModelData } from "@/lib/bindings";
import { fuzzyFilter } from "@/lib/table_utils/fuzzy_filter";
import { DataTablePagination } from "@/components/table/table_pagination";

export const LocalModelTable = (): ReactNode => {
    const [models, setModels] = useState<LocalModelData[]>([]);
    const getModels = async (): Promise<void> => {
        const m = await commands.getLocalOllamaModels();
        if (m.status === "ok") {
            setModels(m.data);
        } else {
            showToast({
                title: "Something went wrong",
                body: "Fluster could not interact with Ollama. Have you installed it?",
                variant: "Error",
                duration: 5000,
            });
        }
    };

    useEventListener("request-local-model-list-refresh", getModels);

    useEffect(() => {
        getModels();
    }, []);

    const [visibility, setVisibility] = useState<
        Record<LocalModelTableColId, boolean>
    >({
        [LocalModelTableColId.name]: true,
        [LocalModelTableColId.modified_at]: true,
        [LocalModelTableColId.size]: true,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = getLocalModelTableColumns();

    const table = useReactTable({
        autoResetPageIndex: true,
        columns,
        data: models,
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        rowCount: models.length,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: (newVisiblity) =>
            setVisibility(newVisiblity as typeof visibility),
        state: {
            columnVisibility: visibility,
            sorting,
            globalFilter,
            pagination,
        },
    });
    return (
        <>
            <div className="space-y-3 max-w-[350px]">
                <Label>Search Models</Label>
                <Input onChange={(e) => table.setGlobalFilter(e.target.value)} />
            </div>
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
                    {table.getPaginationRowModel().rows?.length ? (
                        table.getPaginationRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="cursor-pointer"
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
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination
                hideSelectedCount
                hidePerPage
                table={table}
                classes={{
                    container: "mt-4",
                }}
            />
        </>
    );
};

LocalModelTable.displayName = "LocalModelTable";
