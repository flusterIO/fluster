import { CommandPaletteAnyEntry } from "./models/command_palette_any_entry";
import { CommandPaletteCategory } from "./models/command_palette_category";
import { NavigationCommandPaletteRoot } from "./tree/navigation_root";

export class CommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Home");
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return [new NavigationCommandPaletteRoot()];
    }
}
