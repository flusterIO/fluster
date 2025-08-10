import React, { useMemo, useState, type ReactNode } from "react";
import {
    fuzzyFilter,
    Input,
    Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@fluster.io/dev";
import { AppState } from "@/state/initial_state";
import { connect } from "react-redux";
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
import {
    getKeymapTableColumns,
    KeymapTableColId,
    KeymapTableData,
} from "./keymap_setting_table_columns";
import { EditKeymapSettingModal } from "../edit_keymap_modal";
import { showEditKeymapModal } from "../edit_keymap_modal/show_edit_keymap_modal";
import { KeymapId } from "#/keymap/data/models/keymap_ids";
import { DataTablePagination } from "@/components/table/table_pagination";

const connector = connect((state: AppState) => ({
    keymap: state.keymap,
}));

interface Props {
    keymap: AppState["keymap"];
}

export const KeymapSettingsGroup = connector(({ keymap }: Props): ReactNode => {
    const [visibility, setVisibility] = useState<
        Record<KeymapTableColId, boolean>
    >({
        [KeymapTableColId.stringifiedKeyMap]: false,
        [KeymapTableColId.settingsKey]: false,
        [KeymapTableColId.keymap]: true,
        [KeymapTableColId.desc]: true,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const data: KeymapTableData[] = useMemo(() => {
        return Object.entries(keymap).map((k): KeymapTableData => {
            return {
                stringifiedKeymap: k[1],
                settingKey: k[0],
            };
        });
    }, [keymap]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const columns = getKeymapTableColumns();

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
            <div className="space-y-3 max-w-[350px]">
                <Label>Search Keymaps</Label>
                <Input onChange={(e) => table.setGlobalFilter(e.target.value)} />
            </div>
            <EditKeymapSettingModal />
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const stringifiedKeymap = row.getValue(
                                        KeymapTableColId.stringifiedKeyMap
                                    ) as string;
                                    for (const k of Object.entries(keymap)) {
                                        if (k[1] === stringifiedKeymap) {
                                            return showEditKeymapModal({
                                                stringifiedKeyMap: k[1],
                                                settingKey: k[0] as KeymapId,
                                            });
                                        }
                                    }
                                    console.error("No matching keymap found.");
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
                hidePerPage
                table={table}
                classes={{
                    container: "mt-4",
                }}
            />
        </>
    );
});

KeymapSettingsGroup.displayName = "KeymapSettingsGroup";
