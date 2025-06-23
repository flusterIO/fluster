import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { commands } from "@/lib/bindings";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { AppRoutes } from "#/router/data/app_routes";

export class BookmarksCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Bookmarks", "bookmarked-notes");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const res = await commands.getBookmarkedNotes();
        if (res.status === "ok") {
            return res.data.map((x) => {
                return new GeneralCommandPaletteItem(
                    x.front_matter.title,
                    x.note.file_path,
                    async (nav) => {
                        const sp = new URLSearchParams();
                        sp.set("fsPath", x.note.file_path);
                        nav(`${AppRoutes.viewMdxNote}?${sp.toString()}`);
                    }
                );
            });
        } else {
            console.error("An error occurred while gathering bookmarks: ", res.error);
            return [];
        }
    }
}
