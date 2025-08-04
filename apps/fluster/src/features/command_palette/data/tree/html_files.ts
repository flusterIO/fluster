import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { fsFileExtensionGlob } from "@/lib/fs_glob";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { NavigateFunction } from "react-router";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";
import { ReactNode } from "react";
import { getHtmlFileURl } from "#/html/data/get_html_file_url";

export class HtmlFilesCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Html files", "html_files");
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return null;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await fsFileExtensionGlob("html");
        const notesDir = (store.getState() as AppState).core.notesDirectory ?? "";
        return res.map((s) => {
            const item = new GeneralCommandPaletteItem(
                notesDir.length && s.startsWith(notesDir) ? s.replace(notesDir, "") : s,
                `pdf-${s}`,
                async (nav: NavigateFunction) => {
                    nav(getHtmlFileURl(s));
                }
            );
            item.itemClasses = "text-sm [&_p]:text-sm";
            return item;
        });
    }
}
