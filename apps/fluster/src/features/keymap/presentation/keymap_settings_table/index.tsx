import React, { useMemo, useState, type ReactNode } from "react";
import {
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
import { fuzzyFilter } from "@/lib/table_utils/fuzzy_filter";
import { EditKeymapSettingModal } from "../edit_keymap_modal";
import { showEditKeymapModal } from "../edit_keymap_modal/show_edit_keymap_modal";
import { KeymapId } from "#/keymap/data/models/keymap_ids";

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

    const entries = useMemo(() => {
        console.log("keymap: ", keymap);
        return Object.entries(keymap).map((k): KeymapTableData => {
            return {
                stringifiedKeymap: k[1],
                settingKey: k[0],
            };
        });
    }, [keymap]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 1,
        pageSize: 10,
    });
    const columns = getKeymapTableColumns();

    const table = useReactTable({
        columns: columns,
        data: entries,
        onColumnVisibilityChange: (newVisibility) =>
            setVisibility(newVisibility as typeof visibility),
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnVisibility: visibility,
            sorting,
            pagination,
            globalFilter,
        },
    });
    return (
        <div>
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
        </div>
    );
});

KeymapSettingsGroup.displayName = "KeymapSettingsGroup";
