import { fuzzyFilter } from "@fluster.io/dev";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useDynamicTableColumns } from "./use_dynamic_table_columns";
import { TABLE_EMPTY_STRING_KEY } from "../dynamic_data_table_constants";

const getInitialColumnVisibility = <T extends Object>(
    item: T
): Record<string, boolean> => {
    let data: Record<string, boolean> = {};
    Object.keys(item).forEach((k) => {
        data[k === "" ? TABLE_EMPTY_STRING_KEY : k] = true;
    });
    return data;
};

export const useDynamicDataTable = <T extends object>(items: T[]) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filteredEntries, setFilteredEntries] = useState<T[]>(items);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [columnVisibility, setColumnVisibility] = useState<
        Record<string, boolean>
    >(getInitialColumnVisibility(items.length ? items[0] : {}));
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const columns = useDynamicTableColumns(items);
    const table = useReactTable({
        autoResetPageIndex: true,
        columns,
        data: filteredEntries,
        getCoreRowModel: getCoreRowModel(),
        rowCount: items.length,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            sorting,
            /* columnFilters, */
            globalFilter,
            pagination,
        },
    });
    return {
        table,
        columnLength: columns.length,
        setColumnVisibility,
        columnVisibility,
        setSorting,
        setFilteredEntries,
        setGlobalFilter,
    };
};
