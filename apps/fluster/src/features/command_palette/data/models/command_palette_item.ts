import { Navigator } from "react-router";
import { CommandPaletteAnyEntry } from "./command_palette_any_entry";

export abstract class CommandPaletteItem extends CommandPaletteAnyEntry {
    constructor(label: string) {
        super(label);
    }
    abstract invoke(nav: Navigator): Promise<void>;
}

export class GeneralCommandPaletteItem extends CommandPaletteItem {
    onInvoke: (nav: Navigator) => Promise<void>;
    constructor(label: string, invoke: (nav: Navigator) => Promise<void>) {
        super(label);
        this.onInvoke = invoke;
    }
    async invoke(nav: Navigator) {
        return this.onInvoke(nav);
    }
}
