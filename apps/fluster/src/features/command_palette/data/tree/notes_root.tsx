import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { commands } from "@/lib/bindings";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";
import { getMdxNoteUrl } from "#/mdx/utils/get_mdx_note_url";

export class NotesCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Notes", "cmd-palette-notes");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        const items = await commands.getNoteSummaries({
            per_page: 1000,
            page_number: 1,
        });
        if (items.status === "ok") {
            return items.data.map((x) => {
                return new GeneralCommandPaletteItem(
                    x.title,
                    `${x.title}-${x.file_path}`,
                    async (nav) => {
                        nav(getMdxNoteUrl(x.file_path));
                    }
                );
            });
        } else {
            return [];
        }
    }
}
