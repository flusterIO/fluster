import { Location, NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export abstract class CommandPaletteItem extends CommandPaletteAnyEntry {
    constructor(label: string, id: string) {
        super(label, id);
    }

    abstract filterByLocation(location: Location): boolean;
    abstract invoke(nav: NavigateFunction): Promise<void>;
}

export class GeneralCommandPaletteItem extends CommandPaletteItem {
    onInvoke: (nav: NavigateFunction) => Promise<void>;
    constructor(
        label: string,
        id: string,
        invoke: (nav: NavigateFunction) => Promise<void>
    ) {
        super(label, id);
        this.onInvoke = invoke;
    }
    filterByLocation(): boolean {
        return true;
    }
    async invoke(nav: NavigateFunction) {
        return this.onInvoke(nav);
    }
}
