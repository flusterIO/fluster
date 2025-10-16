import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { getTabularDataTableUrl } from "@/lib/url_utils";
import { NavigateFunction } from "react-router";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";
import { ReactNode } from "react";
import { commands } from "@/lib/bindings";
import { showToast } from "@fluster.io/dev";

export class TabularFilesCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Tabular Files", "tabular");
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return null;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const coreState: AppState["core"] = (store.getState() as AppState).core;
        const res = await commands.getFilesByFileExtensions(
            ["csv"],
            coreState.notesDirectory,
            coreState.nThreads.toString()
        );
        if (res.status === "error") {
            showToast({
                title: "An error occurred",
                body: "An error occurred while attempting to gather your tabular files. If this continues, please file an issue on Github.",
                variant: "Error",
                duration: 5000,
            });
            return [];
        }
        return res.data.map((s) => {
            const item = new GeneralCommandPaletteItem(
                coreState.notesDirectory.length &&
                    s.startsWith(coreState.notesDirectory)
                    ? s.replace(coreState.notesDirectory, "")
                    : s,
                `tabular-${s}`,
                async (nav: NavigateFunction) => {
                    nav(getTabularDataTableUrl(s));
                }
            );
            item.itemClasses = "text-sm [&_p]:text-sm";
            return item;
        });
    }
}
