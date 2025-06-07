import store from "@/state/store";
import { CommandPaletteAnyEntry } from "./models/command_palette_any_entry";
import { CommandPaletteCategory } from "./models/command_palette_category";
import { GeneralCommandPaletteItem } from "./models/command_palette_item";
import { NavigationCommandPaletteRoot } from "./tree/navigation_root";
import { toggleDarkMode } from "#/scaffold/state/slice";
import { syncDatabase } from "@/lib/sync_database";
import { ThemeCommandPaletteRoot } from "./tree/theme_root";
import { CodeThemeCommandPaletteRoot } from "#/editor/data/command_palette/code_theme_command_palette_category";
import { EmbeddedDocsCommandPaletteRoot } from "./tree/embedded_docs_root";
import { NotesCommandPaletteRoot } from "./tree/notes_root";
import { Location } from "react-router";
import { EditInSplitViewCommandEntry } from "./tree/view_in_split_mode_command";

export class CommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Home");
    }

    filterByLocation(): boolean {
        return true;
    }
    async getItems(location: Location): Promise<CommandPaletteAnyEntry[]> {
        return [
            new NavigationCommandPaletteRoot(),
            new GeneralCommandPaletteItem("Toggle Dark Mode", async () => {
                store.dispatch(toggleDarkMode());
            }),
            new ThemeCommandPaletteRoot(),
            new CodeThemeCommandPaletteRoot(),
            new EditInSplitViewCommandEntry(),
            new GeneralCommandPaletteItem("Sync database", syncDatabase),
            new NotesCommandPaletteRoot(),
            new EmbeddedDocsCommandPaletteRoot(),
        ].filter((x) => x.filterByLocation(location));
    }
}
