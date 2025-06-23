import { Location } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export abstract class CommandPaletteCategory extends CommandPaletteAnyEntry {
    constructor(label: string, id: string) {
        super(label, id);
    }
    abstract filterByLocation(location: Location): boolean;
    abstract getItems(location: Location): Promise<CommandPaletteAnyEntry[]>;
}
