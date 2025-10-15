import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
// import { GeneralCommandPaletteItem } from "../models/command_palette_item";
// import { getPdfUrl } from "#/pdf/data/utils/get_pdf_url";
// import { NavigateFunction } from "react-router";
// import store from "@/state/store";
// import { AppState } from "@/state/initial_state";
import { ReactNode } from "react";
// import { commands } from "@/lib/bindings";

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
        // const notesDir = (store.getState() as AppState).core.notesDirectory ?? "";
        // const res = await commands.getFilesByFileExtensions(
        //     ["csv"],
        //     notesDir,
        //     32
        // );
        // return res.map((s) => {
        //     const item = new GeneralCommandPaletteItem(
        //         notesDir.length && s.startsWith(notesDir) ? s.replace(notesDir, "") : s,
        //         `pdf-${s}`,
        //         async (nav: NavigateFunction) => {
        //             nav(getPdfUrl(s));
        //         }
        //     );
        //     item.itemClasses = "text-sm [&_p]:text-sm";
        //     return item;
        // });
        return [];
    }
}
