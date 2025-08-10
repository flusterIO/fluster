import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { TaskListData } from "../../../lib/bindings";
import { getTaskListTableColumns, TaskListColumnId } from "./columns";
import { fuzzyFilter } from "../../../utils/table_utils/table_utils";
import dayjs from "dayjs";
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
import { Label } from "../../../components/shad/label";
import { Input } from "../../../components/shad/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/shad/table";
import { DataTablePagination } from "../../../utils/table_utils/table_pagination";
import { WithInlineMdx } from "../../types";
import { useLocalStorage } from "../../../hooks/use_local_storage";

export interface TaskListDataTableProps extends WithInlineMdx {
    data: TaskListData;
    /** If true, search bar is shown. Defaults to false. */
    searchable?: boolean;
    /** Items to show per page. Defaults to 10. */
    perPage?: number;
}

const sortTasks = (tasks: TaskListData["items"]): TaskListData["items"] => {
    const incomplete: TaskListData["items"] = [];
    const complete: TaskListData["items"] = [];
    const withDueDateAndIncomplete: TaskListData["items"] = [];
    for (const item of tasks) {
        if (item.complete) {
            complete.push(item);
        } else {
            if (item.due_at) {
                withDueDateAndIncomplete.push(item);
            } else {
                incomplete.push(item);
            }
        }
    }
    return [
        ...withDueDateAndIncomplete.sort((a, b) => {
            return (
                dayjs(a.due_at, {
                    utc: true,
                })
                    .toDate()
                    .valueOf() -
                dayjs(b.due_at, {
                    utc: true,
                })
                    .toDate()
                    .valueOf()
            );
        }),
        ...incomplete,
        ...complete,
    ];
};

export const TaskListDataTable = (props: TaskListDataTableProps): ReactNode => {
    const [visibility, setVisibility] = useState<
        Record<TaskListColumnId, boolean>
    >({
        [TaskListColumnId.id]: false,
        [TaskListColumnId.label]: true,
        [TaskListColumnId.task_list_id]: true,
        [TaskListColumnId.due_at]: true,
        [TaskListColumnId.ctime]: true,
        [TaskListColumnId.complete]: true,
    });

    const data = useMemo(() => sortTasks(props.data.items), [props.data.items]);

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pageIndex, setPageIndex] = useLocalStorage(
        `page-index-${props.data.list.id}`,
        0
    );

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: pageIndex ?? 0,
        pageSize: props.perPage ?? 10,
    });

    useEffect(() => {
        if (pagination.pageIndex !== pageIndex) {
            setPageIndex(pagination.pageIndex);
        }
        /* eslint-disable-next-line  --  */
    }, [pagination]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = useMemo(() => {
        return getTaskListTableColumns(props.InlineMdxContent, props.data.items);
        /* eslint-disable-next-line  --  */
    }, [props.data.items]);

    const table = useReactTable({
        autoResetPageIndex: true,
        columns,
        data,
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        rowCount: data.length,
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
            {props.searchable && (
                <div className="space-y-3 max-w-[350px]">
                    <Label>Search Tasks</Label>
                    <Input onChange={(e) => table.setGlobalFilter(e.target.value)} />
                </div>
            )}
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
                hidePerPage={Boolean(props.perPage)}
                table={table}
                classes={{
                    container: "mt-4",
                }}
            />
        </>
    );
};

TaskListDataTable.displayName = "TaskListDataTable";
