import { TraditionalSearchResults } from "@/lib/bindings";
import {
    fuzzyFilter,
    Label,
    Input,
    Table,
    TableHeader,
    DataTablePagination,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    AppRoutes,
    H3,
    Separator,
} from "@fluster.io/dev";
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
import React, { useMemo, useState, type ReactNode } from "react";
import {
    getTaskItemSearchResultColumns,
    TaskItemSearchResultColumnId,
} from "./columns";
import { useNavigate } from "react-router";

interface TaskItemSearchResultsTableProps {
    tasks: TraditionalSearchResults["tasks"];
    perPage?: number;
}

export const TaskItemSearchResultsTable = ({
    tasks,
    perPage = 5,
}: TaskItemSearchResultsTableProps): ReactNode => {
    const nav = useNavigate();
    const [visibility, setVisibility] = useState<
        Record<TaskItemSearchResultColumnId, boolean>
    >({
        [TaskItemSearchResultColumnId.id]: false,
        [TaskItemSearchResultColumnId.label]: true,
        [TaskItemSearchResultColumnId.task_list_id]: false,
        [TaskItemSearchResultColumnId.due_at]: true,
        [TaskItemSearchResultColumnId.ctime]: true,
        [TaskItemSearchResultColumnId.complete]: true,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: perPage ?? 10,
    });

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = useMemo(() => {
        return getTaskItemSearchResultColumns();
    }, []);

    const table = useReactTable({
        autoResetPageIndex: true,
        columns,
        data: tasks,
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        rowCount: tasks.length,
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
            <div className="w-full max-w-[768px]">
                <H3 className="mb-4">Tasks</H3>
                <div className="space-y-3 max-w-[350px] mb-2">
                    <Label>Filter Tasks</Label>
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
                                    onClick={() => {
                                        const sp = new URLSearchParams();
                                        const x = row.getValue(
                                            TaskItemSearchResultColumnId.task_list_id
                                        );
                                        console.log("x: ", x);
                                        sp.set(
                                            "listId",
                                            row.getValue(TaskItemSearchResultColumnId.task_list_id)
                                        );
                                        nav(`${AppRoutes.taskLists}?${sp.toString()}`);
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
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
            </div>
            <Separator className="mb-6 mt-4" />
        </>
    );
};

TaskItemSearchResultsTable.displayName = "TaskItemSearchResultsTable";
