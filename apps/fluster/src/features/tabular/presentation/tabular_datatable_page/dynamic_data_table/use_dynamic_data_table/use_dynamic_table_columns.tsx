import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSortHeader } from "#/bibliography/presentation/bib_table/sort_header";
import { Checkbox } from "@fluster.io/dev";
import { InlineMdxContent } from "#/mdx/presentation/inline_mdx_content";
import { TABLE_EMPTY_STRING_KEY } from "../dynamic_data_table_constants";

export const getTableColumns = <T extends object>(item: T): ColumnDef<T>[] => {
    const columns = Object.keys(item)
        .sort((a, b) => (a < b ? -1 : 1))
        .map((itemKey): ColumnDef<T> => {
            const accessorKey = itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY;
            const id = accessorKey;
            switch (typeof item[itemKey as keyof typeof item]) {
                case "number": {
                    return {
                        id,
                        accessorKey: itemKey,
                        accessorFn: (row) => {
                            return row[itemKey as keyof typeof row];
                        },
                        enableHiding: true,
                        enableSorting: true,
                        header: ({ column }) => {
                            return (
                                <DataTableSortHeader
                                    column={column}
                                    title={itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY}
                                />
                            );
                        },
                    };
                }
                case "string": {
                    return {
                        id,
                        accessorKey: itemKey,
                        accessorFn: (row) => {
                            return row[itemKey as keyof typeof row];
                        },
                        enableHiding: true,
                        enableSorting: true,
                        header: ({ column }) => {
                            return (
                                <DataTableSortHeader
                                    column={column}
                                    title={itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY}
                                />
                            );
                        },
                        cell: ({ row }) => {
                            return (
                                <InlineMdxContent
                                    abortIfNoMath
                                    mdx={row.getValue(
                                        itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY
                                        /* itemKey */
                                    )}
                                />
                            );
                        },
                    };
                }
                case "boolean": {
                    return {
                        id: itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY,
                        accessorKey: itemKey,
                        accessorFn: (row) => {
                            return row[itemKey as keyof typeof row];
                        },
                        cell: ({ row }) => (
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                aria-label="Select row"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            />
                        ),
                        enableSorting: false,
                        size: 50,
                        minSize: 32,
                        /* maxSize: 80, */
                    };
                }
                default: {
                    return {
                        id: itemKey.length ? itemKey : TABLE_EMPTY_STRING_KEY,
                        accessorKey: itemKey,
                        enableHiding: true,
                        enableSorting: true,
                        header: ({ column }) => {
                            return <DataTableSortHeader column={column} title={itemKey} />;
                        },
                    };
                }
            }
        });
    return columns;
};

export const useDynamicTableColumns = <T extends object>(
    items: T[]
): ColumnDef<T>[] => {
    const columns = useMemo(() => {
        return items.length ? getTableColumns(items[0]) : [];
    }, [items]);
    return columns;
};
