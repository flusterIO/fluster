import { globalNavigationItems } from "@/models/static_model_data/navigation_items";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";

export class NavigationCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Navigation");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return globalNavigationItems();
    }
}
