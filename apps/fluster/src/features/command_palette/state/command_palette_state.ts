import { ReactNode } from "react";

export interface CommandPaletteItem {
    label: ReactNode;
    getOptions: () => Promise<CommandPaletteItem[]>;
    onSelect: () => void;
}

export interface CommandPaletteState {
    navStack: CommandPaletteItem[];
}

export const initialCommandPaletteState: CommandPaletteState = {
    navStack: [],
};
