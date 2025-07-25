import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { KeyboardShortcutGroup } from "../keymap_setting_input";
import { KeymapItem } from "#/keymap/data/models/keymap_item";

export interface KeymapTableData {
    /// The key in the AppState.keymap object, not the key pressed.
    settingKey: string;
    stringifiedKeymap: string;
    desc?: string;
}

export enum KeymapTableColId {
    settingsKey = "settingsKey",
    stringifiedKeyMap = "stringifiedKeyMap",
    keymap = "keymap",
    desc = "desc",
}

export const getKeymapTableColumns = (): ColumnDef<KeymapTableData>[] => {
    return [
        {
            id: KeymapTableColId.settingsKey,
            accessorKey: "settingKey",
        },
        {
            id: KeymapTableColId.stringifiedKeyMap,
            accessorKey: "stringifiedKeymap",
        },
        {
            id: KeymapTableColId.keymap,
            header: () => {
                return <div>Description</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(
                    KeymapTableColId.stringifiedKeyMap
                ) as string;
                const km = KeymapItem.fromString(value);
                return km.desc;
            },
        },
        {
            id: KeymapTableColId.keymap,
            header: () => {
                return <div>Keymap</div>;
            },
            cell: ({ row }) => {
                const value = row.getValue(
                    KeymapTableColId.stringifiedKeyMap
                ) as string;
                const km = KeymapItem.fromString(value);
                return <KeyboardShortcutGroup item={km} />;
            },
        },
    ];
};
