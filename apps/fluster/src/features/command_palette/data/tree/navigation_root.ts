import { globalNavigationItems } from "@/models/static_model_data/navigation_items";
import { CommandPaletteAnyEntry } from "../models/command_palette_any_entry";
import { CommandPaletteCategory } from "../models/command_palette_category";
import { GeneralCommandPaletteItem } from "../models/command_palette_item";

export class NavigationCommandPaletteRoot extends CommandPaletteCategory {
    constructor() {
        super("Navigation", "cmd-palette-nav");
    }
    filterByLocation(): boolean {
        return true;
    }
    async getItems(): Promise<CommandPaletteAnyEntry[]> {
        return globalNavigationItems().map((x) => {
            return new GeneralCommandPaletteItem(
                x.label,
                `nav-${x.label}`,
                async (nav) => nav(x.href)
            );
        });
    }
}
