import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { fsFileExtensionGlob } from "@/lib/fs_glob";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { NavigateFunction } from "react-router";
import store from "@/state/store";
import { AppState } from "@/state/initial_state";
import { AppRoutes, showToast } from "@fluster.io/dev";
import { ReactNode } from "react";

export class MdxFilesCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Search by file path", "mdx_files");
    }
    filterByLocation(): boolean {
        return true;
    }
    bottomBar(): ReactNode {
        return null;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await fsFileExtensionGlob("mdx");
        const resMarkdown = await fsFileExtensionGlob("md");
        const notesDir = (store.getState() as AppState).core.notesDirectory ?? "";

        if (notesDir === "") {
            showToast({
                title: "Failed",
                body: "Your notes directory is not set. Please visit your settings page.",
                duration: 5000,
                variant: "Error",
            });
            return [];
        }
        return [...res, ...resMarkdown]
            .sort((a, b) => (a < b ? 1 : -1))
            .map((s) => {
                const item = new GeneralCommandPaletteItem(
                    notesDir.length && s.startsWith(notesDir)
                        ? s.replace(notesDir, "")
                        : s,
                    `mdx-${s}`,
                    async (nav: NavigateFunction) => {
                        const sp = new URLSearchParams();
                        sp.set("fsPath", s);
                        nav(`${AppRoutes.viewMdxNote}?${sp.toString()}`);
                    }
                );
                item.itemClasses = "text-sm [&_p]:text-sm";
                return item;
            });
    }
}
