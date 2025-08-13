import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { AutoSettingColumnId, getAutoSettingTableColumns } from "./columns";
import {
    Button,
    DataTablePagination,
    fuzzyFilter,
    Input,
    Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    useEventListener,
} from "@fluster.io/dev";
import {
    SortingState,
    PaginationState,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";
import { AutoSettingModel, commands } from "@/lib/bindings";
import { getMaxPagination } from "@/lib/max_pagination";
import { BodyPortal } from "@/components/body_portal";
import { CreateAutoSettingModal } from "../create_auto_setting_modal";

export const AutoSettingTable = (): ReactNode => {
    const [data, setData] = useState<AutoSettingModel[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const loading = useRef(false);
    const getData = async (): Promise<void> => {
        loading.current = true;
        const res = await commands.getAllAutoSettings(getMaxPagination());
        if (res.status === "ok") {
            setData(res.data);
            loading.current = false;
        } else {
            console.error("An error occurred while gathering auto settings");
            setData([]);
            loading.current = false;
        }
    };

    useEffect(() => {
        if (!loading.current) {
            getData();
        }
    }, []);

    useEventListener("refresh-auto-setting-list", () => {
        console.log(`Getting auto setting data...`);
        getData();
    });

    const [visibility, setVisibility] = useState<
        Record<AutoSettingColumnId, boolean>
    >({
        [AutoSettingColumnId.id]: false,
        [AutoSettingColumnId.glob]: true,
        [AutoSettingColumnId.value]: true,
        [AutoSettingColumnId.settingType]: true,
        [AutoSettingColumnId.actions]: true,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = getAutoSettingTableColumns();

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
            {modalOpen && (
                <BodyPortal>
                    <CreateAutoSettingModal close={() => setModalOpen(false)} />
                </BodyPortal>
            )}
            <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-end">
                <div className="space-y-3 max-w-[350px]">
                    <Label>Search Auto Settings</Label>
                    <Input onChange={(e) => table.setGlobalFilter(e.target.value)} />
                </div>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalOpen(true);
                    }}
                >
                    Create Auto Setting
                </Button>
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

AutoSettingTable.displayName = "AutoSettingTable";
