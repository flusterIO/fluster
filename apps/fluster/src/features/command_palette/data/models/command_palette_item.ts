import { NavigateFunction } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export abstract class CommandPaletteItem extends CommandPaletteAnyEntry {
    constructor(label: string) {
        super(label);
    }
    abstract invoke(nav: NavigateFunction): Promise<void>;
}

export class GeneralCommandPaletteItem extends CommandPaletteItem {
    onInvoke: (nav: NavigateFunction) => Promise<void>;
    constructor(label: string, invoke: (nav: NavigateFunction) => Promise<void>) {
        super(label);
        this.onInvoke = invoke;
    }
    async invoke(nav: NavigateFunction) {
        return this.onInvoke(nav);
    }
}
