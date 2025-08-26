import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { commands, TaskListData } from "../../../lib/bindings";
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
import { useEventListener } from "../../../hooks/use_event_listener";
import { parseTaskDates } from "../../../utils/date_parsers";

export interface TaskListDataTableProps extends WithInlineMdx {
    /** If true, search bar is shown. Defaults to false. */
    searchable?: boolean;
    /** Items to show per page. Defaults to 10. */
    perPage?: number;
    /** The **name** of the list to be rendered. */
    list: string;
}

const TaskListNotFound = ({ list }: { list: string }): ReactNode => {
    return (
        <div className="w-full text-center">
            The <span className="italic">{list}</span> task list could not be found.
        </div>
    );
};

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
    const [data, setData] = useState<TaskListData | null | false>(null);
    const getItems = async (list: string): Promise<void> => {
        const taskLists = await commands.getAllTaskLists();
        if (taskLists.status === "ok") {
            const item = taskLists.data.find(
                (x) => x.label.toLowerCase() === list.toLowerCase()
            );
            if (item) {
                const tasks = await commands.getTaskListTasks(item.id);
                const taskListData = await commands.getTaskListData(
                    item.id,
                    tasks.status === "ok" ? tasks.data.map((x) => parseTaskDates(x)) : []
                );
                if (taskListData.status === "ok") {
                    setData({
                        list: taskListData.data.list,
                        items: sortTasks(taskListData.data.items),
                    });
                } else {
                    setData(false);
                }
            } else {
                setData(false);
            }
        } else {
            console.error("An error occurred while attempting to get task lists.");
        }
    };
    useEffect(() => {
        getItems(props.list);
    }, [props.list]);
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

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: props.perPage ?? 10,
    });

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = useMemo(() => {
        return getTaskListTableColumns(
            props.InlineMdxContent,
            data ? data.items : []
        );
        /* eslint-disable-next-line  --  */
    }, [data]);

    const table = useReactTable({
        autoResetPageIndex: true,
        columns,
        data: data ? data.items : [],
        manualPagination: false,
        getCoreRowModel: getCoreRowModel(),
        rowCount: (data ? data.items : []).length,
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

    useEventListener("refresh-embedded-task-list", (e) => {
        if (data && e.detail.taskListId === data.list.id) {
            getItems(props.list);
        }
    });

    if (data === false) {
        return <TaskListNotFound list={props.list} />;
    }

    if (data === null) {
        return <div className="w-full h-fit text-center">loading task list...</div>;
    }
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
                                onClick={() => {
                                    window.dispatchEvent(
                                        new CustomEvent("show-task-details", {
                                            detail: {
                                                taskId: row.getValue(TaskListColumnId.id) as string,
                                            },
                                        })
                                    );
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
